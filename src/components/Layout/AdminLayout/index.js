import React from "react";
import HeaderForAdminLayout from "../components/HeaderForAdminLayout";
export default function AdminLayout({ children }) {
  return (
    <div className="AdminLayout" style={{ overflow: "hidden" }}>
      <HeaderForAdminLayout />
      <>{children}</>
    </div>
  );
}
