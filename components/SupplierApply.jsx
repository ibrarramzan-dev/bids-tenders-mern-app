import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
const { useForm } = Form;
const { TextArea } = Input;

export default function SupplierApply({ onApplyClick }) {
  const [otherDocs, setOtherDocs] = useState([]);
  const [applyForm] = useForm();

  const onApply = (values) => {
    console.log("onApply: ", values);
    console.log("otherDocs: ", otherDocs);
    onApplyClick({ ...values, otherDocs });

    applyForm.resetFields();
    setOtherDocs([]);
  };

  return (
    <div>
      <Form form={applyForm} onFinish={onApply}>
        <Form.Item
          label="Any comments or notes"
          name="comments"
          labelCol={{ span: 24 }}
        >
          <TextArea
            autoSize={{
              minRows: 6,
              maxRows: 8,
            }}
            placeholder="Enter any comments or notes"
          />
        </Form.Item>

        <Form.Item
          label="Financial Offer"
          name="financialDoc"
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
              clientAllowedFormats: ["pdf", "doc", "docx"],
              maxFiles: 1,
            }}
            onSuccess={(result) => {
              console.log("result: ", result);

              applyForm.setFields([
                {
                  name: "financialDoc",
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
                  Upload document
                </button>

                <p>
                  {applyForm.getFieldValue("financialDoc") ? (
                    <CheckOutlined style={{ color: "green" }} />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            )}
          </CldUploadWidget>
        </Form.Item>

        <Form.Item
          label="Technical Offer"
          name="technicalDoc"
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
              clientAllowedFormats: ["pdf", "doc", "docx"],
              maxFiles: 1,
            }}
            onSuccess={(result) => {
              console.log("result: ", result);

              applyForm.setFields([
                {
                  name: "technicalDoc",
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
                  Upload document
                </button>

                <p>
                  {applyForm.getFieldValue("technicalDoc") ? (
                    <CheckOutlined style={{ color: "green" }} />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            )}
          </CldUploadWidget>
        </Form.Item>

        <Form.Item
          label="Other Documents"
          name="otherDocs"
          labelCol={{ span: 24 }}
        >
          <CldUploadWidget
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            options={{
              clientAllowedFormats: ["pdf", "doc", "docx"],
            }}
            onSuccess={(result) => {
              console.log("result: ", result);

              otherDocs.push(result.info.secure_url);

              applyForm.setFields([
                {
                  name: "otherDocs",
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
                  {applyForm.getFieldValue("otherDocs") ? (
                    <CheckOutlined style={{ color: "green" }} />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            )}
          </CldUploadWidget>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Apply
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
