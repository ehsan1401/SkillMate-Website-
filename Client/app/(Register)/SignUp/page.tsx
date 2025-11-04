'use client';

import { IcOutlineErrorOutline } from "@/Icons/ErrorIcon";
import { LoadingIcon } from "@/Icons/LoadingIcon";
import { MaterialSymbolsLockOutline } from "@/Icons/PasswordIcon";
import { Button, Input, message } from "antd";
import Image from "next/image";
import { useState } from "react";
import { SignUpUser } from "./action";
import { useRouter } from "next/navigation";
import { MaterialSymbolsPerson } from "@/Icons/UserIcon";
import { RepasscodeIcon } from "@/Icons/RepasscodeIcon";
import { AlternateEmailRounded } from "@/Icons/AlternateEmailRounded";
import AccessDenied from "@/Components/AceessDenied";
import { MdiEyeOff } from "@/Icons/NotVisibleEye";
import { MdiEye } from "@/Icons/VisibleEye";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { theRoutes } from "@/utils/theRoutes";

export default function SignUp() {

  const [loading, setLoading] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [errorShow, seterrorShow] = useState<string>('');
  const [passChecker, setPassChecker] = useState<boolean>(true);
  const [rePassChecker, setRePassChecker] = useState<boolean>(true);
  const { user , refreshUser } = useUser();

  const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

  const HandelError = (text : string | undefined) => {
    messageApi.open({
      type: 'error',
      content: text,
    });
  };


  const passwordVisibleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPassChecker((prev) => !prev);
  };

  const RepasswordVisibleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRePassChecker((prev) => !prev);
  };
  return (
    <>
      {
        user ? (
          <>
            <AccessDenied type='Forbidden' Button={<Button variant="solid" color="volcano">Dashboard</Button>} ButtonHref="Dashboard"/>
          </>
        ) : (<>
            {contextHolder}
            <section
              className={`w-full h-screen bg-cover bg-no-repeat bg-center flex justify-center items-center ${!errorShow && `pt-20`}`}
              style={{ backgroundImage: `url("/Background2.gif")` }}
            >
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);

                  const formData = new FormData(e.currentTarget);
                  const res = await SignUpUser(formData);

                  seterrorShow('');

                  if (!res) {
                    HandelError('Error communicating with the server.')
                    setLoading(false);
                    return;
                  }

                  if (res.ok) {
                      await refreshUser();
                      router.push(theRoutes.Dashboard.main);
                  } else {
                    HandelError(res.message || 'SignUp failed')
                  }

                  setLoading(false);
                }}
                className="lg:w-[30%] md:w-[50%] w-[80%] h-[80%] bg-neutral-50 dark:bg-neutral-700 overflow-hidden p-5 rounded-md"
              >
                    <div className="flex justify-center w-full h-1/5 items-center scale-75 md:scale-90 lg:scale-100">
                      <Image 
                        src="/Images/TitleLessLogo.png" 
                        alt="TitleLessLogo"
                        width={80}
                        height={80}
                        className="dark:hidden"
                      />
                      <Image 
                        src="/Images/LightTitleLessLogo.png" 
                        alt="TitleLessLogo"
                        width={80}
                        height={80}
                        className="dark:block hidden"
                      />
                      <h2 className="flex text-5xl pt-5 text-[#2b80da] dark:text-neutral-50" style={{fontFamily:"scriptMtbold"}}>
                        SkillMate
                      </h2>
                    </div>
                    <p className="text-center text-lg text-neutral-700 dark:text-neutral-100" style={{fontFamily:"Centaur"}}>
                      Wellcome to our Website.
                    </p>

                    <div className="flex flex-col gap-5 px-5 py-5 relative">
                      <button onClick={passwordVisibleChange} className="text-xl absolute right-8 top-[128px] z-30">
                        {passChecker ? <MdiEye /> : <MdiEyeOff />}
                      </button>
                      <button onClick={RepasswordVisibleChange} className="text-xl absolute right-8 top-[180px] z-30">
                        {rePassChecker ? <MdiEye /> : <MdiEyeOff />}
                      </button>
                      <Input placeholder="   User Name" type="text" name="userName" className="px-5" prefix={<MaterialSymbolsPerson className="scale-150 mx-2" />} required />
                      <Input placeholder="   Email" type="email" name="email" className="px-5" prefix={<AlternateEmailRounded className="scale-150 mx-2" />} required/>
                      <Input placeholder="   Password" type={passChecker ? "password" : "text"} name="passCode" className="px-5" prefix={<MaterialSymbolsLockOutline className="scale-150 mx-2" />} required/>
                      <Input placeholder="   Repeat Password" type={rePassChecker ? "password" : "text"} name="RepassCode" className="px-5" prefix={<RepasscodeIcon className="scale-150 mx-2" />} required/>
                      <div className="flex flex-col">
                        <button
                          className={`bg-blue-500 hover:bg-blue-600 font-bold rounded-xl transition-all duration-300 ${!loading ? 'py-3 text-lg cursor-pointer' : 'py-3 text-5xl cursor-not-allowed'}`}
                          type="submit"
                          disabled={loading}
                        >
                          <span className="text-neutral-100">
                            {loading ? <LoadingIcon className="text-neutral-50 m-auto" /> : 'Sign Up'}
                          </span>
                        </button>
                      </div>
                      <p className="text-sm flex gap-2 justify-center items-center scale-75 md:scale-90 lg:scale-100 text-neutral-950 dark:text-neutral-100">
                      Are you already a member?
                      <Button
                        type={isHover ? "primary" : "default"}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        href={theRoutes.auth.Login}
                        className="text-base hover:text-blue-500 transition-all duration-200"
                      >
                        <span style={{fontFamily:"Vazir"}} className="pt-1">Login</span>
                        
                      </Button>
                    </p>
                    </div>


              </form>
            </section>
          </>) 
      }
    </>
  );
}
