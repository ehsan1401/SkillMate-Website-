'use client';
import { IcOutlineErrorOutline } from "@/Icons/ErrorIcon";
import { MaterialSymbolsLockOutline } from "@/Icons/PasswordIcon";
import { MaterialSymbolsPerson } from "@/Icons/UserIcon";
import { Button, Input } from "antd";
import Image from "next/image";
import { useState } from "react";


export default function Login() {

   const [isHover, setIsHover] = useState(false);
   const [error , setError] = useState(false)


   const handleError = ()=>{
    setError(!error)
   }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{backgroundImage : `url("/wp2757874.gif")`}}
    >
      <form action="" className="w-[30%] h-[60%] bg-neutral-50 overflow-hidden p-5 rounded-md">
        <div className="flex justify-center w-full h-1/5 items-center  ">
          <Image 
            src="/Images/TitleLessLogo.png" 
            alt="TitleLessLogo"
            width={80}
            height={80}
          />
          
          <h2
            className="flex text-5xl pt-5 text-blue-950"
            style={{fontFamily:"scriptMtbold"}}
          >
            SkillMate
          </h2>
        </div>
        <div className="w-full h-3/5 p-4 flex flex-col gap-5 justify-center" style={{fontFamily:"Vazir"}}>
          <Input placeholder="   Email address" prefix={<MaterialSymbolsPerson className="scale-150 mx-2" />} />
          <div className="flex flex-col gap-2">
            <Input placeholder="   Password" type="password" className="px-5" prefix={<MaterialSymbolsLockOutline className="scale-150 mx-2" />} />
            <a href="#" className="px-3 py-2 text-xs text-left hover:text-blue-500 transition-all duration-200">Did you forget your password?</a>
          </div>
          <Button type="primary" block color="cyan" variant="solid">
            <span style={{fontFamily:"Franklin"}}>
              Submit
            </span>
          </Button>
        </div>

        <div className="w-full h-1/5 text-center flex flex-col justify-center items-center ">
          <div>
          {
            error &&
            <p
              className="text-red-500 flex gap-1 justify-center items-center"
              style={{fontFamily:"Vazir"}}
            >
              <IcOutlineErrorOutline className="scale-110"/>
              User Dosent Exist!
            </p>
          }
          </div>
          <p className="text-sm flex gap-2 justify-center items-center">Dont have an Account yet? 
            <Button
              type={isHover ? "primary" : "default"} // change type on hover
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              href="/SignUp" 
              className="text-base hover:text-blue-500 transition-all duration-200"
            ><span style={{fontFamily:"Vazir"}} className="pt-1">Sign Up</span></Button>
          </p>

        </div>

      </form>

      <Button type="primary" href="/">Main page</Button>
    </section>
  );
}
