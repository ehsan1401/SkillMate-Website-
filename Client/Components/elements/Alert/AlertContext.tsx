"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AlertType = "success" | "info" | "warning" | "error";

interface AlertState {
  message: string;
  type: AlertType;
  visible: boolean;
}

export interface AlertContextType {
  showAlert: (message: string, type?: AlertType) => void;
  hideAlert: () => void;
  alert: AlertState;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    message: "",
    type: "info",
    visible: false,
  });

  const showAlert = (message: string, type: AlertType = "info") => {
    setAlert({ message, type, visible: true });
    setTimeout(() => setAlert((a) => ({ ...a, visible: false })), 3000);
  };

  const hideAlert = () => setAlert((a) => ({ ...a, visible: false }));

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert باید داخل AlertProvider استفاده شود.");
  return ctx;
};
