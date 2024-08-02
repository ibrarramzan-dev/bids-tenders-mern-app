import { Alert, Button, Form, Input, Modal, Select } from "antd";
import InfoAlertCard from "./InfoAlertCard";
import { useState } from "react";
import bidClassification from "@/utils/bidClassification";
import regions from "@/utils/regions";
import SupplierCustomizeAlerts from "./SupplierCustomizeAlerts";
import SupplierEditPersonalInfo from "./SupplierEditPersonalInfo";

const { useForm } = Form;

const mapToAlertType = {
  alert: "info",
  edit: "warning",
  delete: "error",
};

export default function SupplierInfoAlerts() {
  const [isCustomizeAlertsOpen, setIsCustomizeAlertsOpen] = useState(false);
  const [isEditPersonalInfoOpen, setIsEditPersonalInfoOpen] = useState(false);

  const onEditPersonalInfoSubmit = () => {
    setIsEditPersonalInfoOpen(false);
  };

  return (
    <div className="SupplierInfoAlerts">
      <div className="SupplierInfoAlerts-buttons">
        <Button onClick={() => setIsCustomizeAlertsOpen(true)} type="primary">
          Customize Alerts
        </Button>
        <Button onClick={() => setIsEditPersonalInfoOpen(true)} type="primary">
          Edit Personal Info
        </Button>
      </div>

      <div>
        <InfoAlertCard
          moment="2024-07-23 T 04:30"
          type="info"
          message="Company (The Sunshine Company) posted a bid (Bid 00) in your preferred category and location"
        />

        <InfoAlertCard
          moment="2024-07-23 T 04:30"
          type="info"
          message="Company (The Sunshine Company) posted a bid (Bid 00) in your preferred category and location"
        />

        <InfoAlertCard
          moment="2024-07-23 T 04:30"
          type="info"
          message="Company (The Sunshine Company) posted a bid (Bid 00) in your preferred category and location"
        />

        {/* <InfoAndAlertCard
          moment="2024-07-23 T 04:30"
          type="warning"
          message="Member (Haris) updated the bid(66a1087d8c2eaef549d1e9bd): Need a Cargo Team"
        />

        <InfoAndAlertCard
          moment="2024-07-23 T 04:30"
          type="error"
          message="Member (Waqas) deleted the bid(6692370efe44975b150db736): provision of office supplies for two offices"
        /> */}
      </div>

      <Modal
        title={<p className="modal-heading">Customize Alerts</p>}
        open={isCustomizeAlertsOpen}
        onCancel={() => setIsCustomizeAlertsOpen(false)}
        footer={false}
      >
        <SupplierCustomizeAlerts />
      </Modal>

      <Modal
        title={<p className="modal-heading">Edit Personal Info</p>}
        open={isEditPersonalInfoOpen}
        onCancel={() => setIsEditPersonalInfoOpen(false)}
        footer={false}
      >
        <SupplierEditPersonalInfo
          onEditPersonalInfoSubmit={onEditPersonalInfoSubmit}
        />
      </Modal>
    </div>
  );
}
