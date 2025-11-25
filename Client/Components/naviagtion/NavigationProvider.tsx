'use client';
import { ReactNode } from "react";
import { PanelItemsProvider } from "../context/PanelItem/PanelItemsProvider";


export default function NavigationProvider({children}:{children : ReactNode }){
    return <PanelItemsProvider>{children}</PanelItemsProvider>
}