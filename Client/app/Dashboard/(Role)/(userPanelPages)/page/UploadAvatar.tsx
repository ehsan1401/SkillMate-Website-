
'use client';

import { useEffect, useRef, useState } from 'react';
import { Avatar } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { uploadAvatar } from './clientAction';
import { useAlert } from '@/Components/elements/Alert/AlertContext';
import { API } from '@/utils/Api';
import { useUser } from '@/Components/context/UserContext/UserContext';

export default function UploadAvatar({ avatarUrl , size , border }: { avatarUrl : string , size : number , border? : string}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(avatarUrl);
  const { showAlert } = useAlert();
  const { user } = useUser();


  useEffect(() => {
    setUrl(avatarUrl);
  }, [avatarUrl]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    if (!user) return showAlert("Please login first", "Error");
    

    try {
      setLoading(true);

      await uploadAvatar(e.target.files[0]);
      
      const updatedUser = await fetch(API.user.info, {
        method: 'GET',
        credentials: 'include',
      }).then(r => r.json());

      

      setUrl(`http://localhost:4000${updatedUser.profileImageUrl}?t=${Date.now()}`);

      showAlert("Avatar uploaded successfully!", "success")
    } catch (err) {
      console.error(err);
      showAlert("Avatar Upload failed!", "Error")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative w-fit mx-auto text-center group ${border ? ` ${border}` : ``}`}>
      <Avatar
        size={size}
        src={url}
        onClick={handleClick}
        className="cursor-pointer transition-all duration-300"
      />

      <div
        onClick={handleClick}
        className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
      >
        {loading ? (
          <span className="text-white text-sm">...</span>
        ) : (
          <CameraOutlined style={{ color: 'white', fontSize: '20px' }} />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
