'use client';
import { createContext, ReactNode, useContext, useState } from "react";
import { CheapData } from "./type";


const CheapDataContext = createContext<CheapData | undefined>(undefined)
export function CheapDataProvider({children} : {children : ReactNode}){
    const [favoritePeople , setFavoritePeople] = useState<number>(0)

    return(

        <CheapDataContext.Provider value={{favoritePeople , setFavoritePeople }}>
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