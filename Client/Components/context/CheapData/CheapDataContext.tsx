'use client';
import { createContext, ReactNode, useContext, useState } from "react";
import { CheapData, panelType } from "./type";


const CheapDataContext = createContext<CheapData | undefined>(undefined)
export function CheapDataProvider({children} : {children : ReactNode}){
    const [panelType, setPanelType] = useState<panelType>('Collaborator'); 

    return(

        <CheapDataContext.Provider value={{panelType , setPanelType  }}>
            {children}
        </CheapDataContext.Provider>

    )

}
export function useCheapData(){
    const context = useContext(CheapDataContext);
    if (!context) {
        throw new Error("useCheapData must use inside <CheapDataProvider>!!");
    }
  return context;
}