'use client';

import React, { useEffect, useState } from "react";
import "react-advanced-cropper/dist/style.css";
import { HeaderImagesType, UserInfo } from "../pages/type";

import { useUser } from "@/Components/context/UserContext/UserContext";
import { imageUrl } from "@/utils/imageUrl";
import UploadAvatarCrop from "./components/UploadAvatarCrop";
import Header from "./components/Header";

export default function ProfileAndCoverPhoto({
  formData,
  setFormData,
}: {
  formData: UserInfo;
  setFormData: React.Dispatch<React.SetStateAction<UserInfo>>;
}) {

    const {user} = useUser()
    const[imageName , setImageName] = useState<string>('')
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

    useEffect(()=>{
        setFormData(prev => ({ ...prev,  headerImage : {
            headerImageURL: HeaderImage?.headerURL ,
            headerImageALT: HeaderImage?.headerALT,
            Position: formData.headerImage.Position,
            overlayOpacity: formData.headerImage.overlayOpacity,
            overlayColor: formData.headerImage.overlayColor,
        }}))
    } , [HeaderImage])


  return (
    <div className="w-full h-[450px] flex flex-row gap-4 items-start">
        <div className="pt-2 w-[40%]">
            <UploadAvatarCrop 
                avatarUrl={imageUrl(user?.profileImageUrl)}
                size={300}
                formData={formData}
                setFormData={setFormData}
                setImageName={setImageName}
            />
            <h2 className="text-2xl font-vazir pt-3 text-center">Profile Image</h2>
            <p className="text-center">Image selected: {imageName}</p>
        </div>
        <div className="pt-7 w-[60%] h-[90%]">
            <Header
                HeaderImage={HeaderImage}
                setHeaderImage={setHeaderImage}
            />
        </div>
    </div>
  );
}







