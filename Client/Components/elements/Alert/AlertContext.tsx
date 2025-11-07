"use client";

import { AlertType, Notifications } from "@/Types/Notifications";
import { createContext, useContext, useState, ReactNode } from "react";

export interface AlertContextType {
  showAlert: (message: string, type?: AlertType) => void;
  hideAlert: () => void;
  alert: Notifications;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<Notifications>({
    message: "",
    type: "Info",
    visible: false,
  });

  const showAlert = (message: string, type: AlertType = "Info") => {
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
