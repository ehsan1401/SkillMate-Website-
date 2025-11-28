'use client'

import { Button, Modal, Steps } from "antd";
import { useState } from "react";
import PersonalInformation from "./steps/Personal_Information";
import SkillsAndLearning from "./steps/Skills_&_Learning";
import ProfileAndCoverPhoto from "./steps/Profile_&_CoverPhoto";
import Education from "./steps/Education";
import ExperienceAndProjects from "./steps/Experience_&_Projects";
import { number } from "framer-motion";

export default function Route() {
  const [formData, setFormData] = useState({
    dateofbirth: "",
    bio: "",
    favorite: {
      People: [] as number[],
      Projects: [] as number[],
    },
    learning_skills: [] as string[],
    phone: "",
    resume: {
      file: "",
      link: ""
    },
    skills: [] as string[],
    social: [] as {
      name: string;
      url: string;
    }[],
    headerImage: {
      headerImageURL: "",
      headerImageALT: "",
      Position: "Center" as "Top" | "Center" | "Bottom",
      overlayOpacity: "0.3",
      overlayColor: "#000000",
    },
    Location: {
      City : "",
      country : ""
    },
  });
  const steps = [
    {
      title: 'Personal Information',
      content: <PersonalInformation formData={formData} setFormData={setFormData} />,
    },
    {
      title: 'Skills & Learning',
      content: <SkillsAndLearning formData={formData} setFormData={setFormData}/>,
    },
    {
      title: 'Profile & Cover Photo',
      content: <ProfileAndCoverPhoto formData={formData} setFormData={setFormData}/>,
    },
    {
      title: 'Education',
      content: <Education formData={formData} setFormData={setFormData} />,
    },
    {
      title: 'Experience / Projects',
      content: <ExperienceAndProjects formData={formData} setFormData={setFormData}/>,
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const [current, setCurrent] = useState(0);
  console.log("Form data on Page : " , formData) ;

  return (

    <div className="w-full h-screen pt-16 flex justify-center items-center bg-red-100">
        <Modal
          title={steps[current].title}
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={true}
          width={1200}
          style={{marginTop : "-50px"}}
          footer={null}
        >
            <div className="w-full h-full p-7 relative">
              <div className="w-full h-[95%] py-5 relative">
                {steps[current].content}
                <div className="absolute flex right-0 bottom-4 gap-3 font-vazir py-4">
                  <Button type="default" disabled={current === 0} onClick={() => setCurrent(current - 1)}>Previous</Button>
                  
                  {current === steps.length - 1 ?  
                    <Button type="primary" onClick={()=>{console.log("done")}}>Done</Button>
                  :
                    <Button type="primary" onClick={() => setCurrent(current + 1)}>Next</Button>
                  }
                </div>
              </div>

              <Steps current={current} items={items} className="font-vazir" size="small" />
            </div>
        </Modal>
      </div>


  )
}
