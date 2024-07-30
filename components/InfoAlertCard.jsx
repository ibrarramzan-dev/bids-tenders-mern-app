import { Alert } from "antd";

export default function InfoAlertCard({ moment, type, message }) {
  return (
    <div className="InfoAlertCard">
      <p>{moment}</p>

      <Alert message={message} type={type} className="InfoAlertCard-alert" />
    </div>
  );
}
