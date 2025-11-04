

export type Notifications = {
    message  : string , 
    type : "success" | "warning" | "Error" | "Info" | "Loading" | "Question",
    visible: boolean
}

export type AlertType = "success" | "warning" | "Error" | "Info" | "Loading" | "Question" 