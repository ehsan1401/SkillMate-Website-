'use client';
import AdminPanel from "./(Role)/AdminPanel";
import UserPanel from "./(Role)/userPanel";
import ProUserPanel from "./(Role)/ProUserPanel";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { PanelItemsProvider } from "@/Components/context/PanelItem/PanelItemsProvider";

export default function Dashboard() {
  const { user } = useUser();

  let PanelComponent;

  switch (user?.type) {
    case "ADMIN":
      PanelComponent = <AdminPanel />;
      break;
    case "PRO":
      PanelComponent = <ProUserPanel />;
      break;
    default:
      PanelComponent = <PanelItemsProvider><UserPanel userData={user!} /></PanelItemsProvider>;
  }

  return (
    <div>
      {PanelComponent}
    </div>
  );
}
