'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CheapData, panelType } from "./type";
import { GetNumbersOfNotifications } from "./action";
import { API } from "@/utils/Api";
import { useUser } from "../UserContext/UserContext";
import useSWR, { mutate } from "swr";

const CheapDataContext = createContext<CheapData | undefined>(undefined)

export function CheapDataProvider({ children }: { children: ReactNode }) {
    const [panelType, setPanelType] = useState<panelType>('Collaborator'); 
    const { user } = useUser();

    const {
        data: GetNumberOfNotification,
        error: GetNumberOfNotificationError,
        isLoading: NumberOfNotificationLoading,
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
