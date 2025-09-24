"use client";
import { Button, ConfigProvider } from "antd";
import { useRouter } from "next/navigation";

export default function IButton(
    {Text , address , color , isBlock} : {
        Text : string , 
        address?:string , 
        color :  "blue" | "cyan" | "danger" |"default" | "geekblue" | "gold" | "green" | "lime" | "magenta" | "orange" | "pink" | "primary" | "purple" | "red" | "volcano" | "yellow",
        isBlock? : boolean
    }) {

        const router = useRouter();
  return (
        <ConfigProvider
            theme={{
            token: {
                fontFamily: 'Franklin',
            },
            }}
        >
            <Button type='primary' variant='solid' color={color} block={isBlock} 
            onClick={() => address && router.push(address)}
            >
            {Text}
            </Button>
        </ConfigProvider>
  );
}
