'use client';

import { useDashboardType } from "@/Components/provider/PanelTypeProvider";
import CreatorPanel from "./MainDashboardPages/CreatorPanel";
import CollaboratorPanel from "./MainDashboardPages/CollaboratorPanel";

export default function MainDashboard(){
    const { panelType } = useDashboardType();
    const PanelRender = ()=>{
        switch(panelType){
            case "Creator":
                return <CreatorPanel/>
            case "Collaborator":
                return <CollaboratorPanel/>
            default:
                console.log("error / Incorrect Panel Type!")
        }
    }
           

    return(
        <div className="p-5 w-full h-full select-none overflow-y-scroll">
            <div className="w-full flex flex-col lg:flex-row gap-0 h-16">
                <h1 className="text-5xl text-neutral-950 dark:text-neutral-50 w-full h-full" style={{fontFamily:"scriptMtbold"}}> 
                    Dashboard/ <span className="text-4xl">{panelType}</span>
                </h1>
                {/* <span className="lg:w-2/3 w-full lg:h-16 p-3 -mt-5 lg:mt-0 flex justify-center items-center gap-1 text-neutral-800 dark:text-neutral-100">
                        <MaterialSymbolsNotificationsOutline className="scale-125"/>
                        this is some notifications goes here
                </span> */}
            </div>
            {PanelRender()}


        </div>
    )
}