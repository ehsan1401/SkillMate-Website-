'use client'

import { Steps } from "antd";
import { useState } from "react";
import PersonalInformation from "./steps/Personal_Information";
import SkillsAndLearning from "./steps/Skills_&_Learning";
import ProfileAndCoverPhoto from "./steps/Profile_&_CoverPhoto";
import Education from "./steps/Education";
import ExperienceAndProjects from "./steps/Experience_&_Projects";

export default function Route() {
  const [formData , setFormData] = useState({

  })

  const steps = [
    {
      title: 'Personal Information',
      content: <PersonalInformation />,
    },
    {
      title: 'Skills & Learning',
      content: <SkillsAndLearning />,
    },
    {
      title: 'Profile & Cover Photo',
      content: <ProfileAndCoverPhoto/>,
    },
    {
      title: 'Education',
      content: <Education />,
    },
    {
      title: 'Experience / Projects',
      content: <ExperienceAndProjects/>,
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full h-screen pt-16 flex justify-center items-center bg-red-100">
      <div className="w-[80%] h-[90%] bg-blue-100 p-7">
        <div className="w-full h-[95%] py-5">
          {steps[current].content}
        </div>
        <Steps current={current} items={items} className="font-vazir" size="small" />
      </div>
    </div>
  )
}
