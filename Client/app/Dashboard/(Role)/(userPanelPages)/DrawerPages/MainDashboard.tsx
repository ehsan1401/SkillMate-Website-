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
        <div className="px-5 py-5 w-full h-full select-none scrollbar-none">
            <div className="w-full flex flex-col lg:flex-row gap-0 h-16">
                <h1 className="text-5xl text-neutral-950 dark:text-neutral-50 w-full h-full font-scriptMtbold"> 
                    Dashboard/ <span className="text-4xl">{panelType}</span>
                </h1>
            </div>
            {PanelRender()}


        </div>
    )
}