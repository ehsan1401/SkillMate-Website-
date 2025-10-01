"use client";

import { useModal } from "@/Components/context/ModalContext/ModalContext";
import { Button } from "antd";

export default function Notifications() {
  const { showModal } = useModal();

    const handleSubmit = () => {
    const isValid = false;
    return isValid;
    };


  return (
    <div className="p-5 w-full h-full select-none"> 
        <h1 
            className="text-5xl text-neutral-950 dark:text-neutral-50" 
            style={{fontFamily:"scriptMtbold"}}> 
            Notifications 
        </h1>
        <Button
            type="primary"
            onClick={() =>
                showModal(
                <div>
                    <p>Are you sure?</p>
                </div>,
                "Confirmation",
                handleSubmit,
                "❌ Erooooooooooooooooooooooooor",
                1200
                )
            }
        >
            نمایش مودال
        </Button>
    </div>
  );
}
