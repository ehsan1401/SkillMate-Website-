'use client';
import { UserOutlined } from "@/Icons/UserOutlined";
import { Avatar, Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function NavigationBar () {

    const [token, setToken] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false); 
    const [itemSelected, setitemSelected] = useState<string>(''); 
    const pathname = usePathname();
    const firstSegment = "/" + pathname.split("/")[1];

    useEffect(() => {
        setToken(localStorage.getItem('Token'));
        setMounted(true);
        if(firstSegment === "/"){
            setitemSelected("/Home");
        }else{
            setitemSelected(firstSegment);
        }
    }, [pathname , token]);

    const NavigationItems = [
        "Dashboard" , "Login" , "SignUp" , "Route"
    ]

    console.log(itemSelected)


    return(
        <nav className="w-full h-16 bg-neutral-800 flex">
            <a href="/" className="flex px-10">
                <img src="/images/TitleLessLogo.png" alt="TitleLessLogo" className="w-14" />
                <h2 className="flex items-center h-full text-3xl text-blue-100" style={{fontFamily:"scriptMtbold"}}>
                    SkillMate
                </h2>
            </a>
            <ul className="flex gap-8 justify-center items-center h-full px-10 flex-1">
                {NavigationItems.map((item) => {
                const href = `/${item}`;
                const isActive = href === itemSelected;
                return (
                    <li key={item}>
                    <Link
                        href={href}
                        className={
                        isActive
                            ? "bg-white p-3 rounded-4xl text-black"
                            : "text-white"
                        }
                    >
                        {item}
                    </Link>
                    </li>
                );
                })}
            </ul>
            <div className="float-right flex items-center py-2 px-10">
                {
                    token  ? 
                        <div className="flex items-center gap-5">
                            <Button type="primary" href="/Dashboard">Dashboard</Button>
                            <Avatar
                                size={45} 
                                icon={<UserOutlined />} 
                                style={{ backgroundColor: '#87d068' }}
                                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                            />
                            
                        </div> 
                    : 
                       <div className="flex items-center gap-3 text-white">
                            <Button type="primary" href="/Login">Login</Button>
                            /
                            <Button type="primary" href="/SignUp">SignUp</Button>
                       </div>
                }
            </div>

        </nav>
    )
}