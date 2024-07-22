"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SupplierSavedBids from "@/components/SupplierSavedBids";

const dashboardMenu = ["Saved bids", "Info & alerts"];

export default function SupplierDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState(dashboardMenu[0]);

  return (
    <DashboardLayout
      dashboardMenu={dashboardMenu}
      activeMenuItem={activeMenuItem}
      onMenuItemClick={setActiveMenuItem}
    >
      <div className="ClientDashboard">
        {activeMenuItem === "Saved bids" ? <SupplierSavedBids /> : null}
        {activeMenuItem === "Post a bid" ? <SupplierInfoAlerts /> : null}
      </div>
    </DashboardLayout>
  );
}
