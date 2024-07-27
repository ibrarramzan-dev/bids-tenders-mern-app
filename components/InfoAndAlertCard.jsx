import { Alert } from "antd";

export default function InfoAndAlertCard({ moment, type, message }) {
  return (
    <div className="InfoAndAlertCard">
      <p>{moment}</p>

      <hr />

      <Alert
        message={message}
        type={type}
        className="SupplierInfoAlerts-alert"
      />
    </div>
  );
}
