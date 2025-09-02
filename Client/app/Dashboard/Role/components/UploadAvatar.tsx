
'use client';

import { useEffect, useRef, useState } from 'react';
import { Avatar } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { uploadAvatar } from './action';

interface UploadAvatarProps {
  avatarUrl: string;
}

export default function UploadAvatar({ avatarUrl }: UploadAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(avatarUrl);

  useEffect(() => {
    setUrl(avatarUrl);
  }, [avatarUrl]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const token = localStorage.getItem('Token');
    if (!token) return alert('Please login first');

    try {
      setLoading(true);

      await uploadAvatar(e.target.files[0], token);
      
      const updatedUser = await fetch('http://localhost:4000/users/protected', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json());
      

      setUrl(`http://localhost:4000${updatedUser.profileImageUrl}?t=${Date.now()}`);

      alert('Avatar uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-fit mx-auto text-center group">
      <Avatar
        size={90}
        src={url}
        onClick={handleClick}
        className="cursor-pointer transition-all duration-300 group-hover:opacity-70"
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
