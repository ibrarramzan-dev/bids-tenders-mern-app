import { Spin } from "antd";

function FullScreenLoader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255)",
        zIndex: 1000,
      }}
    >
      <Spin size="large" />
    </div>
  );
}

export default FullScreenLoader;
