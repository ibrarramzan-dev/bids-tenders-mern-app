import { Button, Form, Input, Select } from "antd";
import bidClassification from "@/utils/bidClassification";
import regions from "@/utils/regions";

const { useForm } = Form;

export default function SupplierCustomizeAlerts() {
  const [customizeAlertsForm] = useForm();

  const onCustomizeAlerts = (values) => {
    console.log("onCustomizeAlerts: ", values);
  };

  return (
    <div>
      <p className="SupplierCustomizeAlerts-info-text">
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
  );
}
