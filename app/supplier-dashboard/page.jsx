"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SupplierSavedBids from "@/components/SupplierSavedBids";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SupplierAlerts from "@/components/SupplierAlerts";

const dashboardMenu = ["Saved bids", "Info & alerts"];

export default function SupplierDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState(dashboardMenu[0]);
  const { user } = useSelector((state) => state);

  const router = useRouter();

  useEffect(() => {
    const userType = user.type;

    if (userType) {
      if (userType === "guest" || userType === "client") {
        router.push("/");
      }
    }
  }, [user]);

  return (
    <DashboardLayout
      dashboardMenu={dashboardMenu}
      activeMenuItem={activeMenuItem}
      onMenuItemClick={setActiveMenuItem}
    >
      <div className="ClientDashboard">
        {activeMenuItem === "Saved bids" ? <SupplierSavedBids /> : null}
        {activeMenuItem === "Info & alerts" ? <SupplierAlerts /> : null}
      </div>
    </DashboardLayout>
  );
}
