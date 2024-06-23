import bidClassification from "@/utils/bidClassification";
import bidTypes from "@/utils/bidTypes";
import regions from "@/utils/regions";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
const { RangePicker } = DatePicker;

export default function ClientPostABid() {
  const onPostBid = (values) => {
    console.log("onPostBid: ", values);
  };

  return (
    <div>
      <p className="dashboard-heading">Post a bid</p>

      <Form onFinish={onPostBid}>
        <Form.Item
          label="Bid Classification"
          name="bidClassification"
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
          label="Bid Title"
          name="bidTitle"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input placeholder="Enter bid title" />
        </Form.Item>

        <Form.Item
          label="Bid Type"
          name="bidType"
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
            placeholder="Select bid type"
            onChange={() => {}}
            options={bidTypes}
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

        <Form.Item
          label="Closing Date (Submission)"
          name="submissionClosingDate"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Space direction="vertical" size={12}>
            <DatePicker
              showTime
              showSecond={false}
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={(value) => console.log("onOk of DatePicker: ", value)}
            />
          </Space>
        </Form.Item>

        {/* <Form.Item
          label="Company Logo"
          name="companyLogo"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <CldUploadWidget
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            onSuccess={(result) => {
              supplierSignupForm.setFields([
                {
                  name: "companyLogo",
                  value: result.info.secure_url,
                  errors: [],
                },
              ]);
            }}
            buttonText="Custom Upload Button"
          >
            {({ open }) => (
              <div className="Header-signup-modal-form-upload-wrapper">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="Header-signup-modal-form-upload-btn"
                >
                  Upload Image
                </button>

                <p>
                  {supplierSignupForm.getFieldValue("companyLogo") ? (
                    <CheckOutlined style={{ color: "green" }} />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            )}
          </CldUploadWidget>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Publish Bid
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
