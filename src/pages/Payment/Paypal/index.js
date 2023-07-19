import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import { useState, useMemo } from "react";

export default function PaypalModal({ packageInfo, expiredDate, setIsFinish }) {
  console.log("Packaged Info : ", packageInfo);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  console.log(expiredDate);

  //OUTLINE FUNCTION
  function convertVNDtoUSD(amount) {
    return amount / 23000;
  }

  function convertVNDtoUSD(amount) {
    return Math.round(Math.round(amount / 23000));
  }

  const price = useMemo(
    () => convertVNDtoUSD(packageInfo.salePrice),
    [packageInfo]
  );
  //END OUTLINE FUNCTION

  async function handleChangeStatusAccount(accountID, expiredDate) {
    const res = await fetch(
      "https://64acf61eb470006a5ec514b7.mockapi.io/movie/account/" + accountID,
      {
        method: "PUT", // or 'PUT'
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberShip: true,
          expiredDate: expiredDate,
        }),
      }
    );

    if (!res.ok) {
      return new Error("HTTP has occured error at: " + res.status);
    }
    const result = res.json();
    if (result) {
      localStorage.setItem("memberShip", true);
    }
    return;
  }

  async function handlePaymentSubmit(dataOrder, packageInfo, details) {
    const purchaseUnit = details.purchase_units[0];
    const accountEmail = localStorage.getItem("email");
    const data = {
      accountEmail: accountEmail,
      payer: {
        email: details.payer.email_address,
        payerID: dataOrder.payerID,
      },
      orderID: dataOrder.orderID,
      status: details.status,
      purchase_Time: details.update_time,
      create_Time: details.create_time,
      description: purchaseUnit.description,
      paymentMethod: dataOrder.paymentSource,
      packageSlug: packageInfo.slug,
      price: {
        currency_VN: packageInfo.salePrice,
        currency_EN: purchaseUnit.amount.value || 0,
      },
      currencyCode: purchaseUnit.amount.currency_code,
    };
    try {
      const res = await fetch(
        "https://64acf61eb470006a5ec514b7.mockapi.io/movie/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = res.json();
      if (result) {
        const accountID = localStorage.getItem("id");
        handleChangeStatusAccount(accountID, expiredDate);
      }
      return result;
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Thanh toán gói xem phim: " + packageInfo.slug,
            amount: {
              currency_code: "USD",
              value: convertVNDtoUSD(packageInfo.salePrice),
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })

      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      handlePaymentSubmit(data, packageInfo, details);
      setIsFinish(true);
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AQim8N0ZhiQNADYVWk6zzRniTPkqZd7v7xfd_WN5VmytlZtfiGOIL6Z0G_vi8CWImZ7qg0ffreTu4qgh",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
}
