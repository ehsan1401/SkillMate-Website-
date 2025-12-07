'use client';

import { useRef, useState, useEffect } from "react";
import { Avatar, Modal, Button } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { dataURLtoFile } from "@/utils/dataURLtoFile";
import { UserInfo } from "../context/UserContext/types";

type UploadAvatarCropProps = {
  avatarURl: string;
  Size: number;
  setCropedImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  setImageName: React.Dispatch<React.SetStateAction<string>>
  AvatarStyles? : string
};

export default function UploadAvatarCropModule({
  avatarURl ,
  Size ,
  setCropedImage,
  setImageName,
  AvatarStyles
}: UploadAvatarCropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<CropperRef | null>(null);

  const [url, setUrl] = useState<string | undefined>(undefined);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUrl(avatarURl);
  }, [avatarURl]);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setTempImage(URL.createObjectURL(file));
    setOpen(true);
    setImageName(file.name)
  };

  const handleCrop = () => {
    if (!cropperRef.current) return;
    const canvas = cropperRef.current.getCanvas();
    if (!canvas) return;

    const croppedDataUrl = canvas.toDataURL("image/png");
    const file = dataURLtoFile(croppedDataUrl, "avatar.png");

    setCropedImage(file);
    setUrl(URL.createObjectURL(file));
    setOpen(false);
  };

  return (
    <>
      <div className={`relative w-fit mx-auto text-center group`}>
        {/* <Avatar
          size={size}
          src={formData.profileImage!=="" ? formData.profileImage : url}
          onClick={handleClick}
          className="cursor-pointer transition-all duration-300"
        /> */}
        <Avatar
          size={Size}
          src={
            url
          }
          onClick={handleClick}
          className={`cursor-pointer transition-all duration-300 ${AvatarStyles}`}
        />

        <div
          onClick={handleClick}
          className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          <CameraOutlined style={{ color: "white", fontSize: 20 }} />
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <Modal
        title="Edit Avatar"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>Cancel</Button>,
          <Button key="save" type="primary" onClick={handleCrop}>Save</Button>,
        ]}
        width={450}
      >
        {tempImage && (
          <div  style={{ width: 400, height: 400 }}>
            <Cropper
              src={tempImage}
              stencilProps={{ aspectRatio: 1 }}
              ref={cropperRef}
              className="w-full h-full"
            />
          </div>
        )}
      </Modal>
    </>
  );
}
