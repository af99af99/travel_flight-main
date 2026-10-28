import React from "react";
import { Outlet, useLocation } from "react-router-dom";

// components
import AdminNavbar from "src/admin/components/Navbars/AdminNavbar";
import Sidebar from "src/admin/components/Sidebar/Sidebar";
import HeaderStats from "src/admin/components/Headers/HeaderStats";
import FooterAdmin from "src/admin/components/Footers/FooterAdmin";

export default function Admin() {
  const location = useLocation();

  // Define routes where HeaderStats should not be displayed
  const showBlueBackground = location.pathname === "/admin/settings";

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Render blue background similar to HeaderStats */}
        {showBlueBackground ? (
          <div className="relative bg-blue-400 md:pt-32 pb-32 pt-12" style={{ marginTop: "8px" }}></div>
        ) : (
          <HeaderStats />
        )}
        <div className="px-4 md:px-10 mx-auto w-full -m-24 relative">
          <Outlet />
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
