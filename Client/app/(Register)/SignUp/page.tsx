'use client';

import { IcOutlineErrorOutline } from "@/Icons/ErrorIcon";
import { LoadingIcon } from "@/Icons/LoadingIcon";
import { MaterialSymbolsLockOutline } from "@/Icons/PasswordIcon";
import { Button, Input } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SignUpUser } from "./action";
import { useRouter } from "next/navigation";
import { MaterialSymbolsPerson } from "@/Icons/UserIcon";
import { RepasscodeIcon } from "@/Icons/RepasscodeIcon";
import { AlternateEmailRounded } from "@/Icons/AlternateEmailRounded";
import AccessDenied from "@/Components/AceessDenied";

export default function SignUp() {

  const [loading, setLoading] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [errorShow, seterrorShow] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);          
  const router = useRouter();

  useEffect(() => {
    setToken(sessionStorage.getItem('Token'));
    setMounted(true);
  }, []);

  // if (!mounted) {
  //   return <AccessDenied type='Forbidden' Button={<Button variant="solid" color="volcano">Dashboard</Button>} ButtonHref="/Dashboard"/>;
  // }

  return (
    <>
      {
        token ? (
          <>
            <AccessDenied type='Forbidden' Button={<Button variant="solid" color="volcano">Dashboard</Button>} ButtonHref="Dashboard"/>
          </>
        ) : (    
        <section
          className="w-full h-[91.2vh] bg-cover bg-no-repeat bg-center flex justify-center items-center"
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
                seterrorShow('Error communicating with the server.');
                setLoading(false);
                return;
              }

              if (res.ok) {
                const token = res.data;
                if (token) {
                  sessionStorage.setItem('Token', token.access_token);
                  setToken(token.access_token); 
                  router.push('/Dashboard');
                }
              } else {
                seterrorShow(res.message || 'SignUp failed');
              }

              setLoading(false);
            }}
            className="w-[30%] h-[80%] bg-neutral-50 overflow-hidden p-5 rounded-md"
          >
                <div className="flex justify-center w-full h-1/5 items-center">
                  <Image 
                    src="/Images/TitleLessLogo.png" 
                    alt="TitleLessLogo"
                    width={80}
                    height={80}
                  />
                  <h2 className="flex text-5xl pt-5 text-blue-950" style={{fontFamily:"scriptMtbold"}}>
                    SkillMate
                  </h2>
                </div>
                <p className="text-center text-lg text-neutral-700" style={{fontFamily:"Centaur"}}>
                  Wellcome to our Website.
                </p>

                <div className="flex flex-col gap-5 px-5 py-5">
                  <Input placeholder="   User Name" type="text" name="userName" className="px-5" prefix={<MaterialSymbolsPerson className="scale-150 mx-2" />} required />
                  <Input placeholder="   Email" type="email" name="email" className="px-5" prefix={<AlternateEmailRounded className="scale-150 mx-2" />} required/>
                  <Input placeholder="   Password" type="password" name="passCode" className="px-5" prefix={<MaterialSymbolsLockOutline className="scale-150 mx-2" />} required/>
                  <Input placeholder="   Repeat Password" type="password" name="RepassCode" className="px-5" prefix={<RepasscodeIcon className="scale-150 mx-2" />} required/>
                  <div className="flex flex-col">
                  {
                    errorShow && 
                    <p className="text-red-600 flex justify-center gap-2 ">
                      <IcOutlineErrorOutline className="scale-110" />
                      {errorShow}
                    </p>
                  }
                    
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
                  <p className="text-sm flex gap-2 justify-center items-center">
                  Are you already a member?
                  <Button
                    type={isHover ? "primary" : "default"}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    href="/Login"
                    className="text-base hover:text-blue-500 transition-all duration-200"
                  >
                    <span style={{fontFamily:"Vazir"}} className="pt-1">Login</span>
                  </Button>
                </p>
                </div>


          </form>
        </section>) 
      }
    </>
  );
}
