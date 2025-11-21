'use client';

import { useEffect, useState } from "react";
import MapNotifications from "./NotificationPages/MapNotifications";


export default function Notifications() {
  const [notificationFilter , setNotificationFilter] = useState<NotificationFilter>("All-Notifications")

  useEffect(() => {
    const stored = localStorage.getItem("NotificationsFilter");
    if (stored) setNotificationFilter(stored as NotificationFilter);
  }, []);

  const buttons: NotificationsFilterButtons[] = [
    { name: "All Notifications", value: "All-Notifications" },
    { name: "Unread Only", value: "Unread-Only" },
    { name: "Important", value: "Important" },
    { name: "System Alerts", value: "System-Alerts" },
  ];
  const HandleFilterNotifications = (Filter : NotificationFilter)=>{
    setNotificationFilter(Filter);
    localStorage.setItem("NotificationsFilter" , Filter)
  }
  return (
    <div className="p-5 w-full h-full select-none">
      <header className="h-16 flex">
        <h1 className="text-5xl text-neutral-950 dark:text-neutral-50 font-scriptMtbold w-1/3 h-full">
          Notifications
        </h1>
        <section className="w-2/3 h-full flex justify-center items-center gap-3">
          {buttons.map((item) => (
            <button
              key={item.value}
              className={`px-4 py-2 border-[3px] border-solid border-neutral-600 hover:rounded-xl transition-all duration-500 ${notificationFilter === item.value ? `bg-neutral-300 rounded-xl`: ``}`}
              onClick={()=>{HandleFilterNotifications(item.value)}}
            >
              {item.name}
            </button>
          ))}
        </section>
      </header>
      <div className="h-[90%] p-3 overflow-y-scroll">
          <MapNotifications filter={notificationFilter}/>
      </div>
    </div>
  );
}
