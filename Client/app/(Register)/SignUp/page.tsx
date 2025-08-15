'use client';
import useSWR from "swr";
import { Employeefetcher } from "./action";


interface Employee { 
    id: number ,
    name : string,
    email: string,
    role : "INTERN"| "ENGINNER" | "ADMIN",
    createdAt : Date,
    updateAt : Date
}

export default function SignUp() {

  const { data } = useSWR<Employee[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/employee`,
    Employeefetcher
  );

  console.log(data)

  return (
    <div className="p-5">
      <h1 className="pt-10 text-3xl">This is Sign up page.</h1>
      {data?.map((employee : Employee)=>{
        return(
          <div key={employee.id} className="flex flex-col gap-5 py-5">
            <span>Name: {employee.name}</span>
            <span>email: {employee.email}</span>
            <span>role: {employee.role}</span>
          </div>
        )
      })}
    </div>
  );
}
