import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
export default function DefaultLayout({ children }) {
  return (
    <div className="defaultLayout">
      <Header />
      <>{children}</>
      <Footer />
    </div>
  );
}
