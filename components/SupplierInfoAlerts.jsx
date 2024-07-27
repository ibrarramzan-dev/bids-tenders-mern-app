import { Alert, Button } from "antd";
import InfoAndAlertCard from "./InfoAndAlertCard";

const mapToAlertType = {
  alert: "info",
  edit: "warning",
  delete: "error",
};

export default function SupplierInfoAlerts() {
  return (
    <div className="SupplierInfoAlerts">
      <div className="SupplierInfoAlerts-buttons">
        <Button type="primary">Customize Alerts</Button>
        <Button type="primary">Edit Personal Details</Button>
      </div>

      <div className="SupplierInfoAlerts-alerts-wrapper">
        <InfoAndAlertCard
          moment="2024-07-23 T 04:30"
          type="info"
          message="Company (The Sunshine Company) posted a bid (Bid 00) in your preferred category and location"
        />

        <InfoAndAlertCard
          moment="2024-07-23 T 04:30"
          type="warning"
          message="Member (Haris) updated the bid(66a1087d8c2eaef549d1e9bd): Need a Cargo Team"
        />

        <InfoAndAlertCard
          moment="2024-07-23 T 04:30"
          type="error"
          message="Member (Waqas) deleted the bid(6692370efe44975b150db736): provision of office supplies for two offices"
        />
      </div>
    </div>
  );
}
