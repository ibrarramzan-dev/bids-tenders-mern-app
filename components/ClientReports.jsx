import InfoAndAlertCard from "@/components/InfoAlertCard";

export default function ClientReports() {
  return (
    <div className="SupplierInfoAlerts">
      <p className="dashboard-heading">Reports</p>

      <InfoAndAlertCard
        moment="2024-07-23 T 04:30"
        type="info"
        message="Member (Haris) logged in to your account"
      />

      <InfoAndAlertCard
        moment="2024-07-23 T 04:30"
        type="info"
        message="You logged in to your account"
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
  );
}
