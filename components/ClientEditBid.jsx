import { Form, Select, Input, DatePicker, Button } from "antd";
import bidClassification from "@/utils/bidClassification";
import bidTypes from "@/utils/bidTypes";
import regions from "@/utils/regions";
import { CldUploadWidget } from "next-cloudinary";
const { useForm } = Form;
const { TextArea } = Input;
import React, { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Link from "next/link";
import classNames from "classnames";

export default function ClientEditBid({ bid }) {
  const [attachmentDocs, setAttachmentDocs] = useState([]);
  const [isUploadBtnDisabled, setIsUploadBtnDisabled] = useState(true);
  const [editBidFormValues, setEditBidFormValues] = useState();
  const [editBidForm] = useForm();

  useEffect(() => {
    editBidForm.setFieldsValue({
      classification: bid.classification,
      title: bid.title,
      type: bid.type,
      region: bid.region,
      city: bid.city,
      submissionClosingDate: moment(bid.submissionClosingDate),
      description: bid.description,
      // attachments: bid.attachments,
      submissionLinkOrEmail: bid.submissionLinkOrEmail,
    });
  }, []);

  const onUpdateBid = (values) => {
    values.submissionClosingDate = values.submissionClosingDate.format(
      "YYYY-MM-DDTHH:mm:ss.sssZ"
    );
    console.log("onUpdateBid: ", values);
  };

  const onResetAttachments = () => {
    setIsUploadBtnDisabled(false);
    editBidForm.setFieldValue("attachmentDocs", []);
  };

  console.log("Attachment docs: ", attachmentDocs);

  return (
    <div>
      <Form
        form={editBidForm}
        onFinish={onUpdateBid}
        onValuesChange={(values) => setEditBidFormValues(values)}
      >
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
          label="Bid Title"
          name="title"
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
          name="type"
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
          {/* <DatePicker
            showTime
            showSecond={false}
            onChange={(value, dateString) => {
              console.log("Selected Time: ", value);
              console.log("Formatted Selected Time: ", dateString);
            }}
            onOk={(value) => console.log("onOk of DatePicker: ", value)}
            value={moment(bid.submissionClosingDate)}
          /> */}
          <Datetime
            // value={bid.submissionClosingDate}
            onChange={(newDate) => {
              editBidForm.setFieldValue("submissionClosingDate", newDate);
            }}
            // dateFormat="YYYY-MM-DD"
            // timeFormat="HH:mm:ss"
            // onChange={(value) => {
            //   console.log(value);
            //   editBidForm.setFieldValue("submissionClosingDate", value);
            // }}
          />
        </Form.Item>

        <Form.Item
          label="Bid description"
          name="description"
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
          label="Attach additional documents"
          name="attachments"
          labelCol={{ span: 24 }}
        >
          <div>
            <p
              onClick={() => onResetAttachments()}
              style={{ cursor: "pointer", display: "inline-block" }}
              className={classNames({
                "ClientEditBid-form-reset-clicked": !isUploadBtnDisabled,
              })}
            >
              Reset docs
            </p>
          </div>
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
              console.log("result: ", result);

              attachmentDocs.push(result.info.secure_url);

              editBidForm.setFields([
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
                  disabled={isUploadBtnDisabled}
                >
                  Upload documents
                </button>

                <p>
                  {editBidForm.getFieldValue("attachments") ? (
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

        {/* Premium users */}
        {/* {subscription === "Premium" ? (
            <Form.Item name="featured" labelCol={{ span: 24 }}>
              <Checkbox
                onChange={(e) =>
                  console.log(`Featured checked = ${e.target.checked}`)
                }
              >
                Do you want to feature this bid?
              </Checkbox>
            </Form.Item>
          ) : null} */}

        {/* Paid plans */}
        {/* {subscription === "Standard" || subscription === "Premium" ? (
            <Form.Item name="eTendering" labelCol={{ span: 24 }}>
              <Checkbox
                onChange={(e) => {
                  console.log(`eTendering checked = ${e.target.checked}`);
                  clientPostABidForm.setFieldValue(
                    "eTendering",
                    e.target.checked
                  );
                }}
              >
                eTendering
              </Checkbox>
            </Form.Item>
          ) : null} */}

        {/* {editBidForm.getFieldValue("eTendering") ? (
            <div>
              {members.map((member, index) => (
                <div key={index} style={{ marginBottom: "0.1rem" }}>
                  <div className="ClientPostABid-form-member-fields-wrapper">
                    <p className="ClientPostABid-form-member-input-label">
                      Member {index + 1} Name:
                    </p>

                    <input
                      type="text"
                      name="name"
                      value={member.name}
                      onChange={(event) => handleInputChange(index, event)}
                      className="ClientPostABid-form-member-input"
                    />
                  </div>

                  <div className="ClientPostABid-form-member-fields-wrapper">
                    <p className="ClientPostABid-form-member-input-label">
                      Member {index + 1} Email:
                    </p>

                    <input
                      type="email"
                      name="email"
                      value={member.email}
                      onChange={(event) => handleInputChange(index, event)}
                      className="ClientPostABid-form-member-input"
                    />
                  </div>
                  <br />
                </div>
              ))}

              <div
                onClick={handleAddMember}
                style={{
                  cursor: "pointer",
                  marginTop: "-0.85rem",
                  marginBottom: "1.15rem",
                }}
              >
                <PlusOutlined /> Add more committee members
              </div>
            </div>
          ) : null}
 */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Publish Bid
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
