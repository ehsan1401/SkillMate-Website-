"use client";
import { useModal } from "@/Components/context/ModalContext/ModalContext";
import { EditeIcon } from "@/Icons/EditeIcon";
import { Button, DatePicker, Input, Select, Tooltip } from "antd";
import { updateUser } from "./action";
import { JSX, startTransition, useActionState } from "react";
import { UserInfo, UserType } from "./type";
import { Linkedin } from "@/Icons/socials/Linkedin";
import { MdiGithub } from "@/Icons/socials/GitHub";
import { TelegramCircle } from "@/Icons/socials/TelegramCircle";
import { BiInstagram } from "@/Icons/socials/BiInstagram";
import { FacebookTag } from "@/Icons/socials/FacebookTag";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";


const handleSubmit = () => true;

export default function UpdateInfoButton({ user, userInfo }: { user: UserType; userInfo: UserInfo | null }) {
  const { showModal } = useModal();

  return (
    <>
      <button
        className="absolute right-10 lg:right-24 top-20 text-2xl hover:scale-125 transition-all duration-200 text-neutral-800 dark:text-neutral-100"
        onClick={() =>
          showModal(
            <div className="flex justify-center items-center">
              <ProfileForm user={user} userInfo={userInfo} />
            </div>,
            "Update Profile Information",
            handleSubmit,
            "❌ Error!",
            1200,
            ({ hideModal }) => [
              <Button key="cancel" onClick={hideModal} type="default">
                Cancel
              </Button>
            ]
          )
        }
      >
        <Tooltip title="Edit Your profile" placement="left">
          <EditeIcon />
        </Tooltip>
      </button>
    </>
  );
}

export function ProfileForm({ user, userInfo }: { user: UserType; userInfo: UserInfo | null }) {
    const [state, formAction] = useActionState(updateUser, { message: "" });

    const [socials, setSocials] = useState<{ name: string; url: string }[]>(userInfo?.social as any[] || []);
    const [currentName, setCurrentName] = useState("");
    const [currentUrl, setCurrentUrl] = useState("");

    const defaultDate: Dayjs | null = userInfo?.dateofbirth ? dayjs(userInfo.dateofbirth) : null;
    const [dateofbirth, setDateofbirth] = useState<Dayjs | null>(defaultDate);

    const [phone, setPhone] = useState(userInfo?.phone || "");

    const [bio, setBio] = useState(userInfo?.bio || "");





    const allOptions = [
    { value: "LinkedIn", label: <span className="flex items-center gap-2"><Linkedin /> LinkedIn</span> },
    { value: "GitHub", label: <span className="flex items-center gap-2"><MdiGithub /> GitHub</span> },
    { value: "Telegram", label: <span className="flex items-center gap-2"><TelegramCircle /> Telegram</span> },
    { value: "Instagram", label: <span className="flex items-center gap-2"><BiInstagram /> Instagram</span> },
    { value: "Facebook", label: <span className="flex items-center gap-2"><FacebookTag /> Facebook</span> },
    ];

    const socialIcons: Record<string, JSX.Element> = {
    LinkedIn: <Linkedin />,
    GitHub: <MdiGithub />,
    Telegram: <TelegramCircle />,
    Instagram: <BiInstagram />,
    Facebook: <FacebookTag />,
    };

    // Filter options to exclude already added socials
    const filteredOptions = allOptions.filter(
    (opt) => !socials.some((s) => s.name === opt.value)
    );

    const addSocial = () => {
    if (!currentName || !currentUrl) return;

    // prevent duplicate
    if (socials.some((s) => s.name === currentName)) return;

    setSocials([...socials, { name: currentName, url: currentUrl }]);
    setCurrentName("");
    setCurrentUrl("");
    };

    const removeSocial = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
    };



  return (
    <form 
        onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget as HTMLFormElement);

            // Append current socials state
            formData.set("social", JSON.stringify(socials)); // use set() to replace any existing

            startTransition(() => {
            formAction(formData);
            });
        }}
        className="flex flex-col items-center pb-5 w-[95%]"
    >

      <h1 className="text-2xl" style={{ fontFamily: "Lalezar" }}>
        {user?.userName}
      </h1>

      <div className="w-full h-auto py-5 px-10 flex flex-col gap-5">
        <span className="flex flex-col lg:flex-row gap-3 items-center">
          <label className="font-bold mt-1">Phone Number:</label>
            <Input
            placeholder="Phone Number"
            name="phone"
            prefix="+"
            value={phone}
            style={{ width: "50%" }}
            onChange={(e) => {
                const val = e.target.value;
                if (/^\d{0,12}$/.test(val)) {
                setPhone(val);
                }
            }}
            />


          <label className="font-bold mt-1">Date Of Birth:</label>
            <DatePicker
                name="dateofbirth"
                style={{ width: "50%" }}
                value={dateofbirth}
                onChange={(date) => setDateofbirth(date)}
            />
        </span>

        <span className="flex flex-col lg:flex-row gap-3 items-center">
          <label className="font-bold mt-1">Social Media:</label>

          <Select
            showSearch
            placeholder="Select your Social"
            optionFilterProp="label"
            style={{ width: 200 }}
            options={filteredOptions}
            value={currentName || undefined}
            onChange={(value) => setCurrentName(value)}
          />

          <Input
            placeholder="Social URL"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            style={{ width: "50%" }}
          />

          <Button type="default" onClick={addSocial}>
            Add
          </Button>
        </span>

        <div className="mt-2 flex flex-col lg:flex-row gap-2 w-full flex-wrap">
          {socials.map((s, i) => (
            <div key={i} className="flex justify-between items-center gap-2 border rounded p-1 md:w-[45%]">
              <span className="flex items-center gap-2 px-5">
                <span className="text-lg">{socialIcons[s.name] || null} </span>{s.url}
              </span>
              <Button size="small" danger onClick={() => removeSocial(i)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
        <input
            key={JSON.stringify(socials)}
            type="hidden"
            name="social"
            value={JSON.stringify(socials)}
        />
        <input type="hidden" name="id" value={user.id} />
      <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
        Update
      </Button>

      {/* {state.message && <p className="mt-2">{state.message}</p>}
      <pre className="mt-2">{JSON.stringify(socials, null, 2)}</pre> */}
    </form>
  );
}
