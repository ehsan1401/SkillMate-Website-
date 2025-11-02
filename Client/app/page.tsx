"use client";

import { useUser } from "@/Components/context/UserContext/UserContext";
import Wellcome from "@/Components/Home/Wellcome";
import Footer from "@/Components/naviagtion/footer";
import { MaterialSymbolsDashboardOutline } from "@/Icons/DashboardIcon";
import { LoginIcon } from "@/Icons/LoginIcon";
import { Routes } from "@/utils/theRoutes";
import { FloatButton } from "antd";

export default function Home() {
  const { user } = useUser();
  return (
    <div className="w-full h-full">
      <Wellcome/>
      <div className="lg:hidden">
        {
          user ? 
            <a href={Routes.Dashboard.main}>
              <FloatButton icon={<MaterialSymbolsDashboardOutline />} type="default" style={{ insetInlineEnd: 24 }} tooltip={'Dashboard'} />
            </a>
          :
            <a href={Routes.auth.Login}>
              <FloatButton icon={<LoginIcon />} type="default" style={{ insetInlineEnd: 24 }} tooltip={'Login'} />
            </a>

        }
      </div>
      <Footer/>
    </div>  
  );
}
