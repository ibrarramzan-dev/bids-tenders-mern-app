import bidClassification from "@/utils/bidClassification";
import bidTypes from "@/utils/bidTypes";
import regions from "@/utils/regions";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Select, Space } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { Fragment, useState } from "react";
const { useForm } = Form;
const { TextArea } = Input;

export default function ClientPostABid() {
  const [members, setMembers] = useState([{ name: "", email: "" }]);
  const [clientPostABidFormValues, setClientPostABidFormValues] = useState();
  const [clientPostABidForm] = useForm();

  const onPostBid = (values) => {
    console.log("onPostBid: ", values);
  };

  const handleAddMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newMembers = [...members];
    newMembers[index][name] = value;
    setMembers(newMembers);
  };

  console.log("members: ", members);

  return (
    <div>
      <p className="dashboard-heading">Post a bid</p>

      <Form
        form={clientPostABidForm}
        onFinish={onPostBid}
        onValuesChange={(values) => setClientPostABidFormValues(values)}
      >
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
        <Form.Item name="featured" labelCol={{ span: 24 }}>
          <Checkbox
            onChange={(e) =>
              console.log(`Featured checked = ${e.target.checked}`)
            }
          >
            Do you want to feature this bid?
          </Checkbox>
        </Form.Item>

        {/* Paid plans */}
        <Form.Item name="eTendering" labelCol={{ span: 24 }}>
          <Checkbox
            onChange={(e) => {
              console.log(`eTendering checked = ${e.target.checked}`);
              clientPostABidForm.setFieldValue("eTendering", e.target.checked);
            }}
          >
            eTendering
          </Checkbox>
        </Form.Item>

        {clientPostABidForm.getFieldValue("eTendering") ? (
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

            {/* {committeeMembersFields.map((field, index) => (
              <Fragment key={index}>
                <hr />

                <Form.Item
                  label={`Evaluation committee ${index + 1}`}
                  name={`evaluationCommittee${index + 1}`}
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter committee member name"
                    value={field.name || ""}
                    onChange={(event) => {
                      const newFields = [...committeeMembersFields];
                      newFields[index].name = event.target.value;
                      setCommitteeMembersFields(newFields);
                    }}
                  />
                </Form.Item>

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
                  <Input
                    type="email"
                    placeholder="Enter committee member email"
                    value={field.email || ""}
                    onChange={(event) => {
                      const newFields = [...committeeMembersFields];
                      newFields[index].email = event.target.value;
                      setCommitteeMembersFields(newFields);
                    }}
                  />
                </Form.Item>
              </Fragment>
            ))} */}
          </div>
        ) : null}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Publish Bid
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
