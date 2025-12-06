'use client';
import { createContext, ReactNode, useContext, useState } from "react";
import { CheapData, panelType } from "./type";
import { GetNumbersOfNotifications } from "./action";
import { API } from "@/utils/Api";
import { useUser } from "../UserContext/UserContext";
import useSWR from "swr";
import { GetNumberOfNotification } from "@/app/Dashboard/(Role)/(userPanelPages)/DrawerPages/NotificationPages/type";

const CheapDataContext = createContext<CheapData | undefined>(undefined)

export function CheapDataProvider({ children }: { children: ReactNode }) {
    const [panelType, setPanelType] = useState<panelType>('Collaborator'); 
    const { user } = useUser();

    const {
        data: GetNumberOfNotification,
        mutate : NumbersNotificationsMutate
    } = useSWR<GetNumberOfNotification>(
        user?.id ? API.Notifications.NumberOfNotifications(user.id) : null, 
        GetNumbersOfNotifications
    );

    return (
        <CheapDataContext.Provider
            value={{
                panelType,
                setPanelType,
                GetNumberOfNotification,
                NumbersNotificationsMutate
            }}
        >
            {children}
        </CheapDataContext.Provider>
    );
}

export function useCheapData() {
    const context = useContext(CheapDataContext);
    if (!context) {
        throw new Error("useCheapData must be used inside <CheapDataProvider>!");
    }
    return context;
}
