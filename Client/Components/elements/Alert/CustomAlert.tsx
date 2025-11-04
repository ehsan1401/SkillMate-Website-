"use client";

import { Alert } from "antd";
import { useAlert } from "./AlertContext";


const CustomAlert: React.FC = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert.visible) return null;

  const typeMap: Record<string, "success" | "info" | "warning" | "error"> = {
  success: "success",
  warning: "warning",
  Error: "error",
  Info: "info",
  Loading: "info",
  Question: "info",
};

  return (
    <div className="fixed bottom-10 right-10 z-50 w-80">
      <Alert
        message={alert.message}
        type={typeMap[alert.type]}
        showIcon
        closable
        onClose={hideAlert}
      />
    </div>
  );
};

export default CustomAlert;
