'use client'
import { Button, Modal, Steps } from "antd";
import { useState } from "react";
import PersonalInformation from "./steps/Personal_Information";
import SkillsAndLearning from "./steps/Skills_&_Learning";
import ProfileAndCoverPhoto from "./steps/Profile_&_CoverPhoto";
import Education from "./steps/Education";
import ExperienceAndProjects from "./steps/Experience_&_Projects";
import SocialsMedia from "./steps/Socials_Media";
import { UserInfo } from "./pages/type";



export default function Route() {
const [formData, setFormData] = useState<UserInfo>({
  jobTitle : "",
  dateofbirth: "",
  bio: "",
  favorite: {
    People: [],
    Projects: [],
  },
  learning_skills: [],
  phone: "",
  resume: {
    file: "",
    link: ""
  },
  skills: [],
  social: [],
  headerImage: {
    headerImageURL: "",
    headerImageALT: "",
    Position: "Center",
    overlayOpacity: "0.3",
    overlayColor: "#000000",
  },
  Location: {
    City : "",
    country : ""
  },
  profileImage : "",
  Education: [],
  // Education : {
  //   id: generateId(),
  //   degree: "High School",
  //   fieldOfStudy: "",
  //   school: "",
  //   country: "",
  //   city: "",
  //   startDate: "",
  //   endDate: "",
  //   isCurrent: false,
  //   grade: "",
  //   description: ""
  // }
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
    {
      title: 'Social Media',
      content: <SocialsMedia formData={formData} setFormData={setFormData}/>,
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const [current, setCurrent] = useState(0);
  console.log("Form data on Page : " , formData) ;

  return (

    <div className="w-full h-screen pt-16 flex justify-center items-center bg-red-100">
        <Modal
          title={<h2 className="text-xl">{steps[current].title}</h2>}
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
                  <Button type="default" disabled={current === 0} onClick={() => setCurrent(current - 1)} className="font-vazir pt-1">Previous</Button>
                  
                  {current === steps.length - 1 ?  
                    <Button type="primary" variant="solid" color="green" onClick={()=>{console.log("done")}} className="font-vazir pt-1">Done</Button>
                  :
                    <Button type="primary" onClick={() => setCurrent(current + 1)} className="font-vazir pt-1">Next</Button>
                  }
                </div>
              </div>

              <Steps current={current} items={items} className="font-vazir" size="small" />
            </div>
        </Modal>
      </div>


  )
}
