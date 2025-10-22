"use client";

import Wellcome from "@/Components/Home/Wellcome";
import Footer from "@/Components/naviagtion/footer";
import { MaterialSymbolsDashboardOutline } from "@/Icons/DashboardIcon";
import { LoginIcon } from "@/Icons/LoginIcon";
import { FloatButton } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem('Token'));
    }, [ token]);
  return (
    <div className="w-full h-full">
      <Wellcome/>
      <div className="lg:hidden">
        {
          token ? 
            <a href="/Dashboard">
              <FloatButton icon={<MaterialSymbolsDashboardOutline />} type="default" style={{ insetInlineEnd: 24 }} tooltip={'Dashboard'} />
            </a>
          :
            <a href="/Login">
              <FloatButton icon={<LoginIcon />} type="default" style={{ insetInlineEnd: 24 }} tooltip={'Login'} />
            </a>

        }
      </div>
      <Footer/>
    </div>  
  );
}
