"use Client";
import { useModal } from "@/Components/context/ModalContext/ModalContext";
import { EditeIcon } from "@/Icons/EditeIcon";
import { Tooltip } from "antd";



export default function UpdateInfoButton (){

    const { showModal } = useModal();

    const handleSubmit = () => {
        const isValid = false;
        return isValid;
    };

    return(
        <>
            <button 
                className="absolute right-10 lg:right-24 top-20 text-2xl hover:scale-125 transition-all duration-200 text-neutral-800 dark:text-neutral-100"
                onClick={() =>
                    showModal(
                    <div>
                        <p>Are you sure?</p>
                    </div>,
                    "Update Profile Information",
                    handleSubmit,
                    "❌ Erooooooooooooooooooooooooor",
                    1200
                    )
                }
            >
                <Tooltip title="Edite Your profile" placement="left">
                    <EditeIcon/>
                </Tooltip>
            </button>
        </>
    )
}



const Footer: React.FC = () => {
  return <h3>Footer</h3>;
};