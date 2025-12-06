export type NotificationFilter = "System-Alerts" | "Important" | "Unread-Only" | "All-Notifications" ;

export type NotificationsFilterButtons = {
    name : string , 
    value : NotificationFilter,
    count : number
}

export type ActionButtons = {
    HTML: "button" | "Link" | "Text",
    type: "sync" | "Login" | "Invite" | "Request" | "",
    payload: {
        ConnectionID? : number
    },
    actionName: "accept" | "reject" | "cancel"
}

export type GetNotifications = 'Super'| 'Seen'| 'System'| 'All' ;
export type NotificationData = {
    UserID : number ,
    create_at : Date,
    update_at : Date ,
    is_none_reply : boolean ,
    is_seen : boolean ,
    message : string ,
    profileImageUrl : string,
    userName : string,
    type : "System" | "Normal" | "Super",
    notif_id : number,
    actions : ActionButtons
}

export interface GetNotificationsFormat {
    status : number ,
    data : NotificationData[]
}


export type GetNumberOfNotification = {
    "Super" : number ,
    "System": number ,
    "Seen"  : number ,
    "All" : number
}