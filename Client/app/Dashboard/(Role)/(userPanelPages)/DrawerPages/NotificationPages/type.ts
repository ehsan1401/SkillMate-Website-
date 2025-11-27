type NotificationFilter = "System-Alerts" | "Important" | "Unread-Only" | "All-Notifications" ;

type NotificationsFilterButtons = {
    name : string , 
    value : NotificationFilter,
    count : number
}

type GetNotifications = 'Super'| 'Seen'| 'System'| 'All' ;
type NotificationData = {
    UserID : number ,
    create_at : Date,
    update_at : Date ,
    is_none_reply : boolean ,
    is_seen : boolean ,
    message : string ,
    profileImageUrl : string,
    userName : string,
    type : "System" | "Normal" | "Super",
    notif_id : number
}

interface GetNotificationsFormat {
    status : number ,
    data : NotificationData[]
}


type GetNumberOfNotification = {
    "Super" : number ,
    "System": number ,
    "Seen"  : number ,
    "All" : number
}