import { createContext, ReactNode, useContext, useState } from "react";
import { selectedItem, UserPanelItems } from "./type";


const UserPanelItem = createContext<UserPanelItems | undefined>(undefined)

export function PanelItemsProvider({children} : {children : ReactNode}){
    const [selectedItem , setItemSelected] = useState<selectedItem>('item0')
    const TogglePanelItem = (panelItem : selectedItem )=>{
        setItemSelected(panelItem);
    }
    return(
        <UserPanelItem.Provider value={{selectedItem , TogglePanelItem}}>
            {children}
        </UserPanelItem.Provider>
    )
}

export function useChangePanelItem(){
    const context = useContext(UserPanelItem)
    if(!context){
        throw new Error("useChangePanelItem must be used within a PanelItemsProvider");
    }
    return context ;
}