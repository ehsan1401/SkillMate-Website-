"use client";

import { useActionState } from "react";
import { TestFunction } from "../page/action";

export default function Notifications() {

  const [state , formAction , isPending] = useActionState(TestFunction , null)
  console.log(state)
  return (
    <div className="p-5 w-full h-full select-none"> 
        <h1 
            className="text-5xl text-neutral-950 dark:text-neutral-50" 
            style={{fontFamily:"scriptMtbold"}}> 
            Notifications 
        </h1>



        <form action={formAction}>
          <input type="text" name="name" />
          <button type="submit"> Confirmation</button>
          {isPending ? "Loading..." : state}
        </form>
    </div>
  );
}
