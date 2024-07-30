import { Alert, Button, Form, Input, Modal, Select } from "antd";
import InfoAlertCard from "./InfoAlertCard";
import { useState } from "react";
import bidClassification from "@/utils/bidClassification";
import regions from "@/utils/regions";

const { useForm } = Form;

const mapToAlertType = {
  alert: "info",
  edit: "warning",
  delete: "error",
};

export default function SupplierAlerts() {
  const [isCustomizeAlertsOpen, setIsCustomizeAlertsOpen] = useState(false);
  const [customizeAlertsForm] = useForm();

  const onCustomizeAlerts = (values) => {
    console.log("onCustomizeAlerts: ", values);
  };

  return (
    <div className="SupplierAlerts">
      <div className="SupplierAlerts-buttons">
        <Button onClick={() => setIsCustomizeAlertsOpen(true)} type="primary">
          Customize Alerts
        </Button>
        <Button type="primary">Edit Personal Details</Button>
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
        // title={<p className="modal-heading">Bid</p>}
        open={isCustomizeAlertsOpen}
        onCancel={() => setIsCustomizeAlertsOpen(false)}
        footer={false}
      >
        <div>
          <p className="modal-heading">Customize Alerts</p>

          <p className="SupplierAlerts-info-text">
            Select your preferences to get alerts on latest bids
          </p>

          <Form form={customizeAlertsForm} onFinish={onCustomizeAlerts}>
            <Form.Item
              label="Bid Classification"
              name="classification"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select classification"
                onChange={() => {}}
                options={bidClassification}
              />
            </Form.Item>

            <Form.Item
              label="Region"
              name="region"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select region"
                onChange={() => {}}
                options={regions}
              />
            </Form.Item>

            <Form.Item
              label="Enter City"
              name="city"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input placeholder="Enter city" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
