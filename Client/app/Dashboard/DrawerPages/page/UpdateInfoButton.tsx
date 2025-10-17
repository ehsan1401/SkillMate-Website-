"use client";
import { useModal } from "@/Components/context/ModalContext/ModalContext";
import { EditeIcon } from "@/Icons/EditeIcon";
import { Button, DatePicker, Input, Select, Tag, Tooltip } from "antd";
import { updateUser } from "./action";
import { JSX, startTransition, useActionState, useEffect } from "react";
import { SocialItem, UserInfo, UserType } from "./type";
import { Linkedin } from "@/Icons/socials/Linkedin";
import { MdiGithub } from "@/Icons/socials/GitHub";
import { TelegramCircle } from "@/Icons/socials/TelegramCircle";
import { BiInstagram } from "@/Icons/socials/BiInstagram";
import { FacebookTag } from "@/Icons/socials/FacebookTag";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import { IcOutlineErrorOutline } from "@/Icons/ErrorIcon";

const handleSubmit = () => true;

export default function UpdateInfoButton({ user, userInfo, onUpdated }: { user: UserType; userInfo: UserInfo | null; onUpdated?: () => void }) {
  const { showModal } = useModal();

  return (
    <button
      className="absolute right-10 lg:right-24 top-20 text-2xl hover:scale-125 transition-all duration-200 text-neutral-800 dark:text-neutral-100"
      onClick={() =>
        showModal(
          <div className="flex justify-center items-center">
            <ProfileForm user={user} userInfo={userInfo} onUpdated={onUpdated} />
          </div>,
          "Update Profile Information",
          handleSubmit,
          "❌ Error!",
          1200,
          ({ hideModal }) => [
            <Button key="cancel" onClick={hideModal} type="default">
              Cancel
            </Button>,
          ]
        )
      }
    >
      <Tooltip title="Edit Your profile" placement="left">
        <EditeIcon />
      </Tooltip>
    </button>
  );
}

export function ProfileForm({
  user,
  userInfo,
  onUpdated,
}: {
  user: UserType;
  userInfo: UserInfo | null;
  onUpdated?: () => void;
}) {
  const { showAlert } = useAlert();
  const { TextArea } = Input;
  const [state, formAction] = useActionState(updateUser, { message: "" });

  const [socials, setSocials] = useState<{ name: string; url: string }[]>(userInfo?.social as SocialItem[] || []);
  const [currentName, setCurrentName] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  const defaultDate: Dayjs | null = userInfo?.dateofbirth ? dayjs(userInfo.dateofbirth) : null;
  const [dateofbirth, setDateofbirth] = useState<Dayjs | null>(defaultDate);

  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [bio, setBio] = useState(userInfo?.bio || "");
  const [skills, setSkills] = useState<string[]>(Array.from(new Set(userInfo?.skills || [])));
  const [inputValue, setInputValue] = useState("");
  const [learningSkills, setLearningSkills] = useState<string[]>(Array.from(new Set(userInfo?.learning_skills || [])));
  const [learningInput, setLearningInput] = useState("");

  const handleAddSkill = () => {
    const newSkill = inputValue.trim();
    if (!newSkill) return;
    if (skills.some(skill => skill.toLowerCase() === newSkill.toLowerCase())) {
      showAlert("This skill has already been added.", "warning");
      return;
    }
    setSkills([...skills, newSkill]);
    setInputValue("");
  };

  const handleCloseSkill = (removedSkill: string) => setSkills(skills.filter(skill => skill !== removedSkill));

  const handleAddLearningSkill = () => {
    const newSkill = learningInput.trim();
    if (!newSkill) return;
    if (learningSkills.some(skill => skill.toLowerCase() === newSkill.toLowerCase())) {
      showAlert("This learning skill has already been added.", "warning");
      return;
    }
    setLearningSkills([...learningSkills, newSkill]);
    setLearningInput("");
  };

  const handleCloseLearningSkill = (removedSkill: string) => setLearningSkills(learningSkills.filter(skill => skill !== removedSkill));

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

  const filteredOptions = allOptions.filter(opt => !socials.some(s => s.name === opt.value));

  const addSocial = () => {
    if (!currentName || !currentUrl) return;
    if (socials.some(s => s.name === currentName)) return;
    setSocials([...socials, { name: currentName, url: currentUrl }]);
    setCurrentName("");
    setCurrentUrl("");
  };

  const removeSocial = (index: number) => setSocials(socials.filter((_, i) => i !== index));

  // ✅ Only call onUpdated on client
  useEffect(() => {
    if (state.status === 200) {
      onUpdated?.();
      showAlert("Your Information successfully Updated!", "success");
    }
  }, [state.status, showAlert, onUpdated]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        // Ensure numeric ID is valid
        if (typeof user.id === "number" && !isNaN(user.id)) {
          formData.set("id", user.id.toString());
        } else {
          showAlert("Invalid user ID", "error");
          return;
        }

        formData.set("social", JSON.stringify(socials));
        formData.set("skills", JSON.stringify(skills));
        formData.set("learning_skills", JSON.stringify(learningSkills));

        startTransition(() => {
          formAction(formData);
        });
      }}
      className="flex flex-col items-center pb-5 w-[95%]"
    >
      <h1 className="text-2xl" style={{ fontFamily: "Lalezar" }}>{user?.userName}</h1>
      <Button type="primary" htmlType="submit" style={{ width: "90%" }}>Update</Button>
      <span className="flex text-orange-500 py-2">
        <span className="pt-1"><IcOutlineErrorOutline /></span>
        <span>Make sure you press the update button to save the information.</span>
      </span>

      <div className="w-full h-auto py-5 px-10 flex flex-col gap-5">
        {/* Phone and Date */}
        <span className="flex flex-col lg:flex-row gap-3 items-center">
          <label className="font-bold mt-1">Phone Number:</label>
          <Input
            placeholder="Phone Number"
            name="phone"
            prefix="+"
            value={phone || ""}
            style={{ width: "50%" }}
            onChange={e => {
              const val = e.target.value;
              if (/^\d{0,12}$/.test(val)) setPhone(val);
            }}
          />

          <label className="font-bold mt-1">Date Of Birth:</label>
          <DatePicker name="dateofbirth" value={dateofbirth} onChange={date => setDateofbirth(date)} />
        </span>

        {/* Socials */}
        <span className="flex flex-col lg:flex-row gap-3 items-center">
          <label className="font-bold mt-1">Social Media:</label>
          <Select
            showSearch
            placeholder="Select your Social"
            optionFilterProp="label"
            style={{ width: 200 }}
            options={filteredOptions}
            value={currentName || undefined}
            onChange={value => setCurrentName(value)}
          />
          <Input
            placeholder="Social URL"
            value={currentUrl}
            onChange={e => setCurrentUrl(e.target.value)}
            style={{ width: "50%" }}
          />
          <Button type="default" variant="solid" color="geekblue" onClick={addSocial}>Add</Button>
        </span>

        <div className="mt-2 flex flex-col lg:flex-row gap-2 w-full flex-wrap">
          {socials.map((s, i) => (
            <div key={i} className="flex justify-between items-center gap-2 border border-neutral-300 dark:border-neutral-700 rounded p-1 md:w-[45%]">
              <span className="flex items-center gap-2 px-5">
                <span className="text-xl text-blue-600">{socialIcons[s.name] || null}</span>{s.url}
              </span>
              <Button size="small" variant="solid" color="danger" danger onClick={() => removeSocial(i)}>Remove</Button>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-3 pb-4">
          <span className="flex gap-3">
            <label className="font-bold mt-1">Skills:</label>
            <Input
              placeholder="Skill"
              style={{ width: "76%" }}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onPressEnter={e => {
                e.preventDefault();
                handleAddSkill();
              }}
            />
            <Button type="default" variant="solid" color="geekblue" onClick={handleAddSkill}>Add</Button>
          </span>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => <Tag key={skill} closable onClose={() => handleCloseSkill(skill)}>{skill}</Tag>)}
          </div>
        </div>

        {/* Learning Skills */}
        <div className="flex flex-col gap-3 pb-4">
          <span className="flex gap-3">
            <label className="font-bold mt-1">Learning Skills:</label>
            <Input
              placeholder="Learning Skill"
              style={{ width: "70%" }}
              value={learningInput}
              onChange={e => setLearningInput(e.target.value)}
              onPressEnter={e => {
                e.preventDefault();
                handleAddLearningSkill();
              }}
            />
            <Button type="default" variant="solid" color="geekblue" onClick={handleAddLearningSkill}>Add</Button>
          </span>
          <div className="flex flex-wrap gap-2">
            {learningSkills.map(skill => <Tag key={skill} closable onClose={() => handleCloseLearningSkill(skill)}>{skill}</Tag>)}
          </div>
        </div>

        {/* Bio */}
        <div className="flex gap-3 flex-col md:flex-row">
          <label className="font-bold mt-1">Biography:</label>
          <TextArea rows={6} placeholder="Biography" name="bio" value={bio} style={{ width: "80%" }} onChange={e => setBio(e.target.value)} />
        </div>
      </div>
    </form>
  );
}
