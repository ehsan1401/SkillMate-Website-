'use client';
import { IcOutlineErrorOutline } from "@/Icons/ErrorIcon";
import { MaterialSymbolsLockOutline } from "@/Icons/PasswordIcon";
import { MaterialSymbolsPerson } from "@/Icons/UserIcon";
import { Button, Input } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { loginUser } from "./page/action";
import { useRouter } from 'next/navigation';
import AccessDenied from "@/Components/AceessDenied";
import { LoadingIcon } from "@/Icons/LoadingIcon";

export default function Login() {
  const [isHover, setIsHover] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);          
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem('Token'));
    setMounted(true);
  }, []);


  return (
    <>
      {token ? (
        <>
          <AccessDenied type='Forbidden' Button={<Button variant="solid" color="volcano">Dashboard</Button>} ButtonHref="Dashboard"/>
        </>
      ) : (
        <section className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("/wp2757874.gif")` }}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);

              const formData = new FormData(e.currentTarget);
              const res = await loginUser(formData);

              setError('');

              if (!res) {
                setError('Error communicating with the server.');
                setLoading(false);
                return;
              }

              if (res.ok) {
                const token = res.data;
                if (token) {
                  localStorage.setItem('Token', token.access_token);
                  setToken(token.access_token); 
                  router.push('/Dashboard');
                }
              } else {
                setError(res.message || 'Login failed');
              }

              setLoading(false);
            }}
            className="w-[30%] h-[60%] bg-neutral-50 overflow-hidden p-5 rounded-md"
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

            <div className="w-full h-3/5 p-4 flex flex-col gap-5 justify-center" style={{fontFamily:"Vazir"}}>
              <Input placeholder="   Email address" name="email" prefix={<MaterialSymbolsPerson className="scale-150 mx-2" />} />
              <div className="flex flex-col gap-2">
                <Input placeholder="   Password" type="password" name="passCode" className="px-5" prefix={<MaterialSymbolsLockOutline className="scale-150 mx-2" />} />
                <a href="#" className="px-3 py-2 text-xs text-left hover:text-blue-500 transition-all duration-200">
                  Did you forget your password?
                </a>
              </div>
              <button
                className={`bg-blue-500 hover:bg-blue-600 font-bold rounded-xl transition-all duration-300 ${!loading ? 'py-3 text-lg cursor-pointer' : 'py-3 text-5xl cursor-not-allowed'}`}
                type="submit"
                disabled={loading}
              >
                <span className="text-neutral-100">
                  {loading ? <LoadingIcon className="text-neutral-50 m-auto" /> : 'Login'}
                </span>
              </button>
            </div>

            <div className="w-full h-1/5 text-center flex flex-col justify-center items-center">
              <div>
                {error && (
                  <p className="text-red-500 flex gap-1 justify-center items-center" style={{fontFamily:"Vazir"}}>
                    <IcOutlineErrorOutline className="scale-110" />
                    {error}
                  </p>
                )}
              </div>
              <p className="text-sm flex gap-2 justify-center items-center">
                Dont have an Account yet?
                <Button
                  type={isHover ? "primary" : "default"}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  href="/SignUp"
                  className="text-base hover:text-blue-500 transition-all duration-200"
                >
                  <span style={{fontFamily:"Vazir"}} className="pt-1">Sign Up</span>
                </Button>
              </p>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
