"use client";

import { LightIcon } from "@/Icons/LightIcon";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";
import { ConfigProvider, notification } from "antd";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type PanelType = "Creator" | "Collaborator";

interface DashboardTypeContextType {
  panelType: PanelType;
  togglePanelType: () => void;
}

const DashboardTypeContext = createContext<DashboardTypeContextType | undefined>(undefined);

export function DashboardTypeProvider({ children }: { children: ReactNode }) {
  const [panelType, setPanelType] = useState<PanelType>("Creator");
  const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
    api.open({
      message: <div className="flex gap-1">
         <MaterialSymbolsNotificationsOutline className="text-yellow-600 text-xl mt-[3px]"/> 
         <h3 className="text-neutral-700">Panel Mode changed!</h3>
      </div>,
      description:<div className="text-neutral-700">
        {panelType === 'Collaborator' ? <>Youre currently in <strong>Creator Mode</strong> — switch to Collaborator to explore other projects.</> : <>Youre currently in <strong>Collaborator Mode</strong> — switch to Creator to start your own project or build a team.</>}
      </div>
        ,
      duration: 2,
      placement:'bottomLeft',
      style: {
        backgroundColor: `${panelType === 'Collaborator' ? `#C2E2FA` : `#FFDE63`}`,
        borderRadius : '10px',
      },
    });
  };


  useEffect(() => {
    const stored = localStorage.getItem("Ptype");
    if (stored === "Creator" || stored === "Collaborator") {
      setPanelType(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Ptype", panelType);
  }, [panelType]);

  const togglePanelType = () => {
    openNotification()
    setPanelType(prev => (prev === "Creator" ? "Collaborator" : "Creator"));
    
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Notification: {
            colorInfoBg: '#424769'
          },
        },
      }}
    >
    <DashboardTypeContext.Provider value={{ panelType, togglePanelType }}>
      {contextHolder}
      {children}
    </DashboardTypeContext.Provider>
    </ConfigProvider>
  );
}

// ✅ Custom Hook
export function useDashboardType() {
  const context = useContext(DashboardTypeContext);
  if (!context) {
    throw new Error("useDashboardType must be used within a DashboardTypeProvider");
  }
  return context;
}
