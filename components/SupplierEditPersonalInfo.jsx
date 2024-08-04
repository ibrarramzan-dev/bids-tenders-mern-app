import React from "react";
import { Button, Form, Input, notification, Select } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import bidClassification from "@/utils/bidClassification";
import { CldUploadWidget } from "next-cloudinary";
import supplierExperience from "@/utils/supplierExperience";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "@/app/AppState/Features/user/userSlice";

const { useForm } = Form;

export default function SupplierEditPersonalInfo({ onEditPersonalInfoSubmit }) {
  const { data } = useSelector((state) => state.user);
  const [editPersonalInfoForm] = useForm();

  const dispatch = useDispatch();

  const onEditPersonalInfo = (values) => {
    console.log("onCustomizeAlerts: ", values);

    axios
      .put(`/api/suppliers/${data._id}`, values)
      .then((res) => {
        const { data: supplierUpdatedData, success } = res.data;

        if (success) {
          notification.success({
            message: "Success",
            description: `${editPersonalInfoForm.getFieldValue(
              "agencyName"
            )} Info has been updated`,
          });

          editPersonalInfoForm.setFieldsValue(supplierUpdatedData);
          onEditPersonalInfoSubmit();
          dispatch(
            login({
              type: "supplier",
              data: supplierUpdatedData,
            })
          );
        }
      })
      .catch((err) => console.log("Error: ", err));
  };

  console.log("new data: ", data);

  return (
    <div>
      <Form
        initialValues={data}
        form={editPersonalInfoForm}
        onFinish={onEditPersonalInfo}
      >
        <Form.Item
          label="Company Name"
          name="agencyName"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Form.Item
          label="Company Logo"
          name="agencyLogo"
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
              editPersonalInfoForm.setFields([
                {
                  name: "agencyLogo",
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
                  {editPersonalInfoForm.getFieldValue("agencyLogo") ? (
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
          label="Scope of Operation"
          name="scopeOfOperation"
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
            placeholder="Select scope of operation"
            onChange={() => {}}
            options={bidClassification}
          />
        </Form.Item>

        <Form.Item
          label="Experience"
          name="experience"
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
            placeholder="Select experience"
            onChange={() => {}}
            options={supplierExperience}
          />
        </Form.Item>

        <p className="modal-sub-heading">Supplier User Details</p>

        <Form.Item
          label="Email"
          name="email"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input type="email" placeholder="Enter email" disabled />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input type="password" placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Telephone"
          name="telephone"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              const val = e.target.value;
              const numericVal = val.replace(/[^\d]/g, "");

              editPersonalInfoForm.setFieldValue("telephone", numericVal);
            }}
            placeholder="Enter telephone"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Update Info
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
