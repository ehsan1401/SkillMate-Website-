'use client'
import { Button, Modal, Steps } from "antd";
import { useEffect, useState } from "react";
import PersonalInformation from "./steps/Personal_Information";
import SkillsAndLearning from "./steps/Skills_&_Learning";
import ProfileAndCoverPhoto from "./steps/Profile_&_CoverPhoto";
import Education from "./steps/Education";
import ExperienceAndProjects from "./steps/Experience_&_Projects";
import SocialsMedia from "./steps/Socials_Media";
import { UserInfo } from "./pages/type";
import { UploadUserProfileData } from "./pages/action";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import { useBreakpoint } from "@/Components/hooks/useBreakpoint";



export default function UserProfile(
  {showModal , setShowModal}:
  {showModal : boolean , setShowModal : React.Dispatch<React.SetStateAction<boolean>>}
) {
  const {user , userInfo , mutate} = useUser()
  const { showAlert } = useAlert();
  
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
    profileImage : undefined,
    Education: [],
    workExperience : [],
    Gender : "Other"
  });

  useEffect(()=>{
    if(userInfo && user )
    setFormData(
      {
        jobTitle : userInfo.jobTitle ,
        dateofbirth: userInfo.dateofbirth,
        bio: userInfo.bio,
        favorite: userInfo.favorite ,
        learning_skills: userInfo.learning_skills,
        phone: userInfo.phone,
        resume: userInfo.resume,
        skills: userInfo.skills,
        social: userInfo.social,
        headerImage:userInfo.headerImage,
        Location: userInfo.Location ,
        profileImage : user.profileImageUrl,
        Education: userInfo.Education,
        workExperience : userInfo.workExperience,
        Gender : user.Gender
      }
    )
  }, [])

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
  const breakPoint = useBreakpoint();
  const breakPointRec = breakPoint === "base" || breakPoint === "sm" || breakPoint === "md"

  const HandleSubmitFormData = async () => {
    const result = await UploadUserProfileData(formData, user!.id, (step, status) => {
      if (status === "skip") console.log(`${step} skipped`);
      else if (status === true) console.log(`${step} done`);
      else console.log(`${step} failed`);
    });
    console.log("Final status:", result);
    mutate()
    if(result.avatar && result.generalInfo && (result.avatar==="skip" || result.avatar===true)){
      showAlert("Your information has been successfully registered.", "success");
    }
    setShowModal(false)
  }

  return (
        <Modal
          title={<h2 className="text-xl">{steps[current].title}</h2>}
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={showModal}
          onCancel={()=> setShowModal(false)}
          width={1200}
          style={{marginTop : "-50px"}}
          footer={null}
        >
            <div className="w-full h-full lg:p-7 py-5 px-0 relative">
              <div className="w-full h-[95%] py-5 relative">
                {steps[current].content}
                <div className="lg:absolute flex right-0 bottom-4 gap-3 font-vazir lg:py-4 pt-12">
                  <Button type="default" disabled={current === 0} onClick={() => setCurrent(current - 1)} className="font-vazir pt-1" block={breakPointRec}>Previous</Button>
                  
                  {current === steps.length - 1 ?  
                    <Button type="primary" variant="solid" color="green" onClick={HandleSubmitFormData} className="font-vazir pt-1" block={breakPointRec}>Done</Button>
                  :
                    <Button type="primary" onClick={() => setCurrent(current + 1)} className="font-vazir pt-1" block={breakPointRec}>Next</Button>
                  }
                </div>
              </div>

              <Steps current={current} items={items} className="font-vazir" size="small" />
            </div>
        </Modal>
  )
}
