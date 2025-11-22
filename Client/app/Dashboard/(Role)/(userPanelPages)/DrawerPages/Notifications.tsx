'use client';

import { useEffect, useState } from "react";
import MapNotifications from "./NotificationPages/MapNotifications";
import { useCheapData } from "@/Components/context/CheapData/CheapDataContext";
import { Badge } from "antd";


export default function Notifications() {
  const [notificationFilter , setNotificationFilter] = useState<NotificationFilter>("All-Notifications")
  const {GetNumberOfNotification } = useCheapData() 


  useEffect(() => {
    const stored = localStorage.getItem("NotificationsFilter");
    if (stored) setNotificationFilter(stored as NotificationFilter);
  }, []);

  const buttons: NotificationsFilterButtons[] = [
    { name: "All Notifications", value: "All-Notifications" , count : (GetNumberOfNotification!.All) },
    { name: "Unread Only", value: "Unread-Only", count : GetNumberOfNotification!.Seen },
    { name: "Important", value: "Important" , count : GetNumberOfNotification!.Super},
    { name: "System Alerts", value: "System-Alerts", count : GetNumberOfNotification!.System },
  ];
  const HandleFilterNotifications = (Filter : NotificationFilter)=>{
    setNotificationFilter(Filter);
    localStorage.setItem("NotificationsFilter" , Filter)
  }
  return (
    <div className="p-5 w-full h-full select-none">
      <header className="md:h-16 h-auto flex md:flex-row flex-col">
        <h1 className="text-5xl text-neutral-950 dark:text-neutral-50 font-scriptMtbold w-1/3 h-full">
          Notifications
        </h1>
        <section className="md:w-2/3 w-full h-full flex justify-center items-center gap-3">
          {buttons.map((item) => (
             <Badge count={item.count} color="blue">
                <button
                  key={item.value}
                  className={`md:px-4 md:py-2 px-2 py-1 border-[3px] border-solid border-neutral-600 hover:rounded-md transition-all duration-500 text-xs md:text-base ${notificationFilter === item.value ? `bg-neutral-300 rounded-md`: ``}`}
                  onClick={()=>{HandleFilterNotifications(item.value)}}
                >
                  {item.name}
                </button>
              </Badge>
          ))}
        </section>
      </header>
      <div className="md:h-[90%] p-3 overflow-y-scroll py-1 md:py-0 ">
          <MapNotifications filter={notificationFilter}/>
      </div>
    </div>
  );
}
