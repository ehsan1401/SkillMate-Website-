'use client';

import React, { useEffect, useState } from "react";
import "react-advanced-cropper/dist/style.css";
import { HeaderImagesType, UserInfo } from "../pages/type";

import { useUser } from "@/Components/context/UserContext/UserContext";
import { imageUrl } from "@/utils/imageUrl";
import UploadAvatarCrop from "./components/UploadAvatarCrop";
import Header from "./components/Header";
import { useBreakpoint } from "@/Components/hooks/useBreakpoint";

export default function ProfileAndCoverPhoto({
  formData,
  setFormData,
}: {
  formData: UserInfo;
  setFormData: React.Dispatch<React.SetStateAction<UserInfo>>;
}) {

    const {user} = useUser()
    const[imageName , setImageName] = useState<string>('')
    const breakPoint = useBreakpoint();
    const breakPointRec = breakPoint === "base" || breakPoint === "sm" || breakPoint === "md"
    const[HeaderImage , setHeaderImage] = useState<HeaderImagesType>(formData.headerImage.headerImageURL ?
        {
            headerName : formData.headerImage.headerImageALT ,
            headerURL : formData.headerImage.headerImageURL,
            headerALT : formData.headerImage.headerImageALT
        }:
        {
            headerName : "Header1" ,
            headerURL : "/Headers/Header1.gif",
            headerALT : "Header1"
        }
    )

useEffect(() => {
    setFormData(prev => ({
        ...prev,
        headerImage: {
            headerImageURL: HeaderImage?.headerURL,
            headerImageALT: HeaderImage?.headerALT,
            Position: prev.headerImage.Position,
            overlayOpacity: prev.headerImage.overlayOpacity,
            overlayColor: prev.headerImage.overlayColor,
        }
    }))
}, [HeaderImage, setFormData])



  return (
    <div className="w-full lg:h-[450px] h-auto flex flex-col lg:flex-row lg:gap-4 items-start">
        <div className="pt-2 lg:w-[40%] w-full">
            <UploadAvatarCrop 
                avatarUrl={imageUrl(user?.profileImageUrl)}
                size={breakPointRec ? 150 : 300}
                formData={formData}
                setFormData={setFormData}
                setImageName={setImageName}
            />
            <h2 className="text-2xl font-vazir pt-3 text-center">Profile Image</h2>
            {
                imageName
                &&
                <p className="text-center">Image selected: {}</p>
            }
        </div>
        <div className="pt-7 lg:w-[60%] w-full h-[90%]">
            <Header
                HeaderImage={HeaderImage}
                setHeaderImage={setHeaderImage}
            />
        </div>
    </div>
  );
}







