

export type CheapData = {
  panelType: panelType
  setPanelType: React.Dispatch<React.SetStateAction<panelType>>
  GetNumberOfNotification : GetNumberOfNotification | undefined
  NumbersNotificationsMutate : ()=>void
}


export type panelType = "Creator" | "Collaborator" ;

type GetNumberOfNotification = {
    "Super" : number ,
    "System": number ,
    "Seen"  : number ,
    "All"  : number 

}