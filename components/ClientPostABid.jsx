import bidClassification from "@/utils/bidClassification";
import bidTypes from "@/utils/bidTypes";
import regions from "@/utils/regions";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Select, Space } from "antd";
import { CldUploadWidget } from "next-cloudinary";
const { useForm } = Form;
const { TextArea } = Input;

export default function ClientPostABid() {
  const [clientPostABidForm] = useForm();

  const onPostBid = (values) => {
    console.log("onPostBid: ", values);
  };

  return (
    <div>
      <p className="dashboard-heading">Post a bid</p>

      <Form form={clientPostABidForm} onFinish={onPostBid}>
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
          <DatePicker
            showTime
            showSecond={false}
            onChange={(value, dateString) => {
              console.log("Selected Time: ", value);
              console.log("Formatted Selected Time: ", dateString);
            }}
            onOk={(value) => console.log("onOk of DatePicker: ", value)}
          />
        </Form.Item>

        <Form.Item
          label="Bid description"
          name="bidDiscription"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <TextArea
            autoSize={{
              minRows: 6,
              maxRows: 8,
            }}
            placeholder="Enter bid description"
          />
        </Form.Item>

        <Form.Item
          label="Attachments"
          name="attachments"
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
            options={{
              clientAllowedFormats: [
                "pdf",
                "doc",
                "docx",
                "xls",
                "xlsx",
                "ppt",
                "pptx",
              ],
            }}
            onSuccess={(result) => {
              clientPostABidForm.setFields([
                {
                  name: "attachments",
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
                  Upload documents
                </button>

                <p>
                  {clientPostABidForm.getFieldValue("attachments") ? (
                    <CheckOutlined style={{ color: "green" }} />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            )}
          </CldUploadWidget>
        </Form.Item>

        {/* Premium users */}
        <Form.Item name="featured" labelCol={{ span: 24 }}>
          <Checkbox
            onChange={(e) =>
              console.log(`Featured checked = ${e.target.checked}`)
            }
          >
            Do you want to feature this bid?
          </Checkbox>
        </Form.Item>

        <Form.Item
          label="Submission link or email"
          name="submissionLinkOrEmail"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input placeholder="Enter submission link or email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Publish Bid
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
