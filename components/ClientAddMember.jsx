import { updateClientMembers } from "@/app/AppState/Features/user/userSlice";
import { formatTextWithoutSpaceLowerCase } from "@/utils/helpers";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const { useForm } = Form;

export default function ClientAddMember() {
  const [addMemberForm] = useForm();

  const dispatch = useDispatch();

  const { type, data } = useSelector((state) => state.user);

  const onAddMember = (values) => {
    axios
      .put(`/api/clients/add-member/${data._id}`, values)
      .then((res) => {
        const { success } = res.data;

        if (success) {
          notification.success({
            message: "Success",
            description: `Member ${addMemberForm.getFieldValue(
              "email"
            )} added to your company`,
          });

          dispatch(
            updateClientMembers({
              type,
              data: { ...data, members: [...data.members, values] },
            })
          );

          addMemberForm.resetFields();
        }
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div>
      <p className="dashboard-heading">Add a member</p>

      <Form form={addMemberForm} onFinish={onAddMember}>
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
          <Input type="email" placeholder="Enter email" />
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Add member
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
