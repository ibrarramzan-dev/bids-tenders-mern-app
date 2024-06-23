"use client";

import { useState, useRef } from "react";
import { Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DashboardLayout from "@/components/DashboardLayout";
import ClientPublishedBids from "@/components/ClientPublishedBids";
import ClientPostABid from "@/components/ClientPostABid";

const dashboardMenu = [
  "Published bids",
  "Post a bid",
  "Tender box",
  "Reports",
  "Evaluation panels",
  "Suppliers list",
];

export default function ClientDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState(dashboardMenu[1]);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
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
        ) : null}
        {activeMenuItem === "Suppliers list" ? <ClientSuppliersList /> : null} */}
      </div>
    </DashboardLayout>
  );
}
