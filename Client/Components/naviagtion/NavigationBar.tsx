'use client';
import { UserOutlined } from "@/Icons/UserOutlined";
import { logout } from "@/utils/logout";
import { Avatar, Button, ConfigProvider } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { API } from "@/utils/Api";
import Image from "next/image";
import { UserType } from "@/app/Dashboard/(Role)/(userPanelPages)/DrawerPages/page/type";


export default function NavigationBar () {
    
    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [itemSelected, setitemSelected] = useState<string>(''); 
    const pathname = usePathname();
    const firstSegment = "/" + pathname.split("/")[1];
    const AltAvatar = "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
    const [data, setData] = useState<UserType | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {

      setData(undefined)

      try {
        const res = await fetch(API.user.info, {
          method: 'GET',
          credentials: 'include',
        })

        if (!res.ok) {
          throw new Error('Unauthorized or request failed')
        }

        const result = await res.json()
        setData(result)
        setToken("isLogin")
      } catch (err: any) {
        console.log(err.message || 'Something went wrong')
      }
    }

    fetchData()
  }, [])

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(sessionStorage.getItem('Token'));
        }
        if(firstSegment === "/"){
            setitemSelected("/Home");
        }else{
            setitemSelected(firstSegment);
        }
    }, [pathname , token , firstSegment]);

    const NavigationItems = [
        "Dashboard" , "Login" , "SignUp" , "Route"
    ]


    return(
        <nav className="w-full h-16 bg-neutral-200 dark:bg-neutral-800 flex fixed z-50">
        <ConfigProvider
            theme={{
                token: {
                fontFamily: "vazir"
                },
            }}
        >
            <Link href="/" className="px-10 hidden lg:flex">
                <Image src="/Images/TitleLessLogo.png" alt="TitleLessLogo" className="w-14 dark:hidden" width={60} height={60}/>
                <Image src="/Images/LightTitleLessLogo.png" alt="TitleLessLogo" className="w-14 dark:block hidden" width={60} height={60}/>
                <h2 className="flex items-center h-full text-3xl text-[#2b80da] dark:bg-gradient-to-tr dark:from-neutral-100 dark:via-blue-300 dark:to-blue-500 bg-clip-text dark:text-transparent" style={{fontFamily:"scriptMtbold"}}>
                    SkillMate
                </h2>
            </Link>
            <ul className="flex gap-3 lg:gap-8 justify-center items-center h-full lg:px-10 flex-1">
                <Link href="/" className="lg:px-10 lg:hidden">
                    <Image src="/Images/LightTitleLessLogo.png" alt="TitleLessLogo" className="w-14 h-14 dark:block hidden" width={60} height={60}/>
                    <Image src="/Images/TitleLessLogo.png" alt="TitleLessLogo" className="w-14 h-14 dark:hidden" width={60} height={60}/>

                </Link>
                {NavigationItems.map((item) => {
                const href = `/${item}`;
                const isActive = href === itemSelected;
                return (
                    <li key={item} className="text-sm lg:text-base">
                    <Link
                        href={href}
                        className={
                        isActive
                            ? "dark:bg-white bg-neutral-700 lg:p-3 px-3 py-2 lg:py-3  rounded-3xl dark:text-black text-white "
                            : "dark:text-white text-neutral-900"
                        }
                    >
                        {item}
                    </Link>
                    </li>
                );
                })}
            </ul>
            
            <div className="float-right items-center py-2 px-10 lg:flex hidden">
                {
                    token === undefined ? null : ( 
                        token  ? 
                            <div className="flex items-center gap-5">
                                {
                                    firstSegment ===`/Dashboard` ? 
                                        <Button variant="solid" color="danger" onClick={logout}>Logout</Button>
                                    :
                                        <Button type="primary" href="/Dashboard">Dashboard</Button>
                                }

                                
                                <Avatar
                                    size={45} 
                                    icon={<UserOutlined />} 
                                    style={{ backgroundColor: '#87d068' }}
                                    src={data?.profileImageUrl ? `${API.base.backend}${data.profileImageUrl}` : AltAvatar}
                                />
                                
                            </div> 
                        : 
                        <div className="flex items-center gap-3 dark:text-white ">
                                <Button type="primary" href="/Login">Login</Button>
                                /
                                <Button type="primary" href="/SignUp">SignUp</Button>
                        </div>
                    )
                }
            </div>
        </ConfigProvider>
        </nav>
    )
}
