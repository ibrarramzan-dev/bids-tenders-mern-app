"use client";

import { useState, useRef, useEffect } from "react";
import { Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DashboardLayout from "@/components/DashboardLayout";
import ClientPublishedBids from "@/components/ClientPublishedBids";
import ClientPostABid from "@/components/ClientPostABid";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import FullScreenLoader from "@/components/FullScreenLoader";
import ClientSuppliersList from "@/components/ClientSuppliersList";

const dashboardMenu = [
  "Published bids",
  "Post a bid",
  "Reports",
  "Evaluation panels",
  "Suppliers list",
];

export default function ClientDashboard() {
  // const [showSpin, setShowSpin] = useState(true);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setShowSpin(false);
  //   }, 5000); // 5 seconds

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  const { user } = useSelector((state) => state);

  const router = useRouter();

  useEffect(() => {
    const userType = user.type;

    if (userType) {
      if (userType === "guest" || userType === "supplier") {
        router.push("/");
      }
    }
  }, [user]);

  const [activeMenuItem, setActiveMenuItem] = useState(dashboardMenu[0]);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div>
      {/* {showSpin && <FullScreenLoader />} */}
      <DashboardLayout
        dashboardMenu={dashboardMenu}
        activeMenuItem={activeMenuItem}
        onMenuItemClick={setActiveMenuItem}
      >
        <div className="ClientDashboard">
          {activeMenuItem === "Published bids" ? <ClientPublishedBids /> : null}
          {activeMenuItem === "Post a bid" ? <ClientPostABid /> : null}
          {/* {activeMenuItem === "Tender box" ? <ClientTenderBox /> : null}
        {activeMenuItem === "Reports" ? <ClientReports /> : null}
        {activeMenuItem === "Evaluation panels" ? (
          <ClientEvaluationPanels />
        ) : null}*/}
          {activeMenuItem === "Suppliers list" ? <ClientSuppliersList /> : null}
        </div>
      </DashboardLayout>
    </div>
  );
}
