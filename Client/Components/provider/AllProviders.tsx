import { ReactNode } from "react";
import { DashboardTypeProvider } from "./PanelTypeProvider";
import { UserProvider } from "../context/UserContext/UserContext";
import ThemeProvider from "./ThemeProvider";
import { AlertProvider } from "../elements/Alert/AlertContext";
import { ModalProvider } from "../context/ModalContext/ModalContext";
import { CheapDataProvider } from "../context/CheapData/CheapDataContext";
import CustomAlert from "../elements/Alert/CustomAlert";



export default function AllProviders({children} : {children : ReactNode}){

    return(
        <>
        <UserProvider>
        <ThemeProvider>
        <AlertProvider>  
        <ModalProvider>
        <CheapDataProvider>
        <DashboardTypeProvider>
            {children}
        </DashboardTypeProvider>
        </CheapDataProvider>
        </ModalProvider>
        <CustomAlert />
        </AlertProvider>
        </ThemeProvider>
        </UserProvider>

        </>
    )

}