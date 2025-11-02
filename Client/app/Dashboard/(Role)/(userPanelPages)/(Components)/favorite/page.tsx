'use client';
import { useUser } from "@/Components/context/UserContext/UserContext";


export default function favorite(){
      const { user } = useUser();

    // return <div className="pt-20">this is favorite page</div>
    return(
        <>
            <p className="pt-20">
                Hello there {user?.userName}.
                email: {user?.email}
            </p>
        </>
    )
}
