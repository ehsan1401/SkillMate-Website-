import { useModal } from "@/Components/context/ModalContext/ModalContext";
import { StreamlineDelete1Solid } from "@/Icons/RemoveIcon";
import { Button, Tooltip } from "antd";
import { favorite, RemoveFavoritePeopleButtonProps } from "../action/type";
import { IcOutlineErrorOutline } from "@/Icons/ErrorIcon";
import { DeleteFavoritePeople, GetFavoritePeople } from "../action/clientAction";
import { API } from "@/utils/Api";
import { useState } from "react";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import { useSWRConfig } from 'swr';



export default function RemoveFavoritePeopleButton( { User , DeleteUserID , listofid } : RemoveFavoritePeopleButtonProps){
    const { showModal } = useModal();
    const { showAlert } = useAlert();
    const handleSubmits = () => true ;
    const { mutate: globalMutate } = useSWRConfig();

    const handleSubmit = async () => {
        console.log("Deleting user ID:", DeleteUserID, "for user:", User.id);
        const res = await DeleteFavoritePeople(User.id , DeleteUserID , API.actions.DeleteFavoritePeople)
        console.log(res.updatedFavorite.People)
        console.log(listofid)
        await globalMutate(
        [`favoritePeople-${listofid.join(',')}`, listofid],
        (prev: any) => prev?.filter((p: any) => p.id !== DeleteUserID),
        false
        );

        showAlert(res.message, "success");
    }
    return(
    <button
      className="absolute hover:scale-125 transition-all duration-200 text-neutral-800 dark:text-neutral-100 right-5 top-5"
      onClick={(e) =>{
        e.preventDefault();
        e.stopPropagation();
        showModal(
            <div className="flex justify-center items-center gap-2 py-8">
                <IcOutlineErrorOutline className="text-lg text-yellow-400 mb-[7px]"/>
                <h5>Are you sure you want to remove this user from favorites?</h5>
            </div>,
            "Confirm Remove From Favorite",
            handleSubmits,
            "❌ Error!",
            500,
            150,
            ({ hideModal }) => [
            <Button key="cancel" onClick={hideModal} type="default">
                Cancel
            </Button>,
            <Button key="ok" onClick={()=>{ hideModal() , handleSubmit() }} variant="solid" color="red">
                Remove
            </Button>,
            ]
        )
        }
      }
    >
      <Tooltip title="Remove" placement="right">
        <StreamlineDelete1Solid/>
      </Tooltip>
    </button>
    )
}