import bidClassification from "@/utils/bidClassification";
import bidTypes from "@/utils/bidTypes";
import regions from "@/utils/regions";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { useSelector } from "react-redux";
const { useForm } = Form;
const { TextArea } = Input;

export default function ClientPostABid() {
  const [attachmentDocs, setAttachmentDocs] = useState([]);
  const [members, setMembers] = useState([{ name: "", email: "" }]);
  const [postBidFormValues, setPostBidFormValues] = useState();
  const [postBidForm] = useForm();
  const { agencyName, agencyLogo, _id, subscription } = useSelector(
    (state) => state.user.data
  );

  const onPostBid = (values) => {
    if (postBidForm.getFieldValue("eTendering")) {
      values.members = members;
    } else {
      values.members = [];
    }

    values.agencyName = agencyName;
    values.submissionClosingDate = values.submissionClosingDate.format(
      "YYYY-MM-DDTHH:mm:ss.sssZ"
    );
    values.attachments = attachmentDocs;
    values.agencyLogo = agencyLogo;
    values.clientId = _id;
    values.status = "Open";

    if (values.featured === undefined) {
      values.featured = false;
    }

    if (values.eTendering === undefined) {
      values.eTendering = false;
    }

    axios
      .post("/api/bids", values)
      .then((res) => {
        const { success } = res.data;

        if (success) {
          notification.success({
            message: "Success",
            description: `Bid ${postBidForm.getFieldValue(
              "title"
            )} has been published`,
          });

          postBidForm.resetFields();
          setAttachmentDocs([]);
          setMembers([]);
        }
      })
      .catch((err) => console.log("Error: ", err));
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
        form={postBidForm}
        onFinish={onPostBid}
        onValuesChange={(values) => setPostBidFormValues(values)}
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

              postBidForm.setFields([
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
                  {postBidForm.getFieldValue("attachments") ? (
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
        {subscription === "Premium" ? (
          <Form.Item name="featured" labelCol={{ span: 24 }}>
            <Checkbox
              onChange={(e) => {
                console.log(`Featured checked = ${e.target.checked}`);
                postBidForm.setFieldValue("featured", e.target.checked);
              }}
            >
              Do you want to feature this bid?
            </Checkbox>
          </Form.Item>
        ) : null}

        {/* Paid plans */}
        {subscription === "Standard" || subscription === "Premium" ? (
          <Form.Item name="eTendering" labelCol={{ span: 24 }}>
            <Checkbox
              onChange={(e) => {
                console.log(`eTendering checked = ${e.target.checked}`);
                postBidForm.setFieldValue("eTendering", e.target.checked);
              }}
            >
              eTendering
            </Checkbox>
          </Form.Item>
        ) : null}

        {postBidForm.getFieldValue("eTendering") ? (
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Publish Bid
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
