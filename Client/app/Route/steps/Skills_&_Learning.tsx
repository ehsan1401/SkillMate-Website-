'use client';
import { Button, Input, Select, Tag } from "antd"
import { UserInfo } from "../pages/type"
import { useEffect, useState } from "react"
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import AutocompleteInput from "@/Components/elements/Autocomplete/AutocompleteInput";
import JobTitleOptions from "@/Data/JobTitleOptions";

export default function SkillsAndLearning(
    { 
        formData, 
        setFormData 
    } 
    : 
    { 
        formData : UserInfo, 
        setFormData: React.Dispatch<React.SetStateAction<UserInfo>> 
    }
){
    const { showAlert } = useAlert();
    
    const [Skills , setSkills] = useState<string[]>([])
    const [skill , setSkill] = useState<string>('')

    const [learningSkills , setLearningSkills] = useState<string[]>([])
    const [learningskill , setLearningSkill] = useState<string>('')

    useEffect(()=>{
        setSkills(formData.skills)
        setLearningSkills(formData.learning_skills)
    } , [])

    const HandleAddSkill = () => {
        if (!skill.trim()) return;
        if(Skills.length > 39) {
            showAlert("You cant add more than 40 skills.", "warning");
            return null;
        }
        const skillExist = Skills.some(s => s.toLowerCase() === skill.toLowerCase());
        if (skillExist) return;
        setSkills(prev => [...prev, skill]);
        setSkill("");
    };

    const HandleCloseSkill = (skillToRemove: string) => {
        setSkills(prev => prev.filter(s => s !== skillToRemove));
    };

    useEffect(()=>{
        setFormData(prev => ({ ...prev, skills : Skills  }))
    } , [Skills])


    const HandleAddLearningSkill = () => {
        if (!learningskill.trim()) return;
        if(learningSkills.length > 39) {
            showAlert("You cant add more than 40 learning skills.", "warning");
            return null;
        }
        const skillExist = learningSkills.some(s => s.toLowerCase() === learningskill.toLowerCase());
        if (skillExist) return;
        setLearningSkills(prev => [...prev, learningskill]);
        setLearningSkill("");
    };

    const HandleCloseLearningSkill = (skillToRemove: string) => {
        setLearningSkills(prev => prev.filter(s => s !== skillToRemove));
    };

    useEffect(()=>{
        setFormData(prev => ({ ...prev, learning_skills : learningSkills}))
    } , [learningSkills])

    const [role, setRole] = useState<string>("");
    const roles = [
        "Front-end Developer",
        "Back-end Developer",
        "Full-stack Developer",
        "UI/UX Designer",
        "Industrial Engineer",
        "Other"
    ];

    return(
    <div className="w-full h-[450px] flex flex-col gap-4 px-5 pt-5">
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 w-full">

        <div className="flex items-center gap-2 col-span-2 py-4">
          <label className="font-bold w-[20%] text-right">Your Main Role / Job Title :</label>
          <div className="w-[80%] flex gap-3">
            <AutocompleteInput
                value={formData.jobTitle || ""}
                options={JobTitleOptions}
                placeholder="Type or select your main role"
                onChange={(val) => setFormData(prev => ({ ...prev, jobTitle: val }))}
            />

          </div>
          {role}
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <label className="font-bold w-[10%] text-right">Your Skills:</label>
          <div className="w-[90%] flex gap-3">
            <Input
              style={{ width: "80%", height: "32px" }}
              value={skill}
              onChange={(e)=>{setSkill(e.target.value)}}
              onPressEnter={HandleAddSkill}
              className="font-vazir"
              suffix={<span>{Skills.length}/40</span>}
            />
            <Button className="w-[20%] font-vazir pt-1" type="primary" variant="solid" color="purple" onClick={HandleAddSkill}>
                Add
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2 px-6">
          <div className="w-[100%] flex flex-wrap gap-3">
            {Skills.map((selectedSkill : string)=>{
                return(
                <Tag
                    key={selectedSkill}
                    closable={{
                        'aria-label': 'Close Button',
                    }}
                    onClose={() => HandleCloseSkill(selectedSkill)}
                >
                    {selectedSkill}
                </Tag>
                )
            })}
          </div>
        </div>

        
        <div className="flex items-center gap-2 col-span-2">
          <label className="font-bold w-[20%] text-right">What your curently learning:</label>
          <div className="w-[80%] flex gap-3">
            <Input
              style={{ width: "78%", height: "32px" }}
              value={learningskill}
              onChange={(e)=>{setLearningSkill(e.target.value)}}
              onPressEnter={HandleAddLearningSkill}
              className="font-vazir"
              suffix={<span>{learningSkills.length}/40</span>}
            />
            <Button className="w-[23%] font-vazir pt-1" type="primary" variant="solid" color="purple" onClick={HandleAddLearningSkill}>
                Add
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2 px-6">
          <div className="w-[100%] flex flex-wrap gap-3">
            {learningSkills.map((selectedSkill : string)=>{
                return(
                <Tag
                    key={selectedSkill}
                    closable={{
                        'aria-label': 'Close Button',
                    }}
                    onClose={() => HandleCloseLearningSkill(selectedSkill)}
                >
                    {selectedSkill}
                </Tag>
                )
            })}
          </div>
        </div>

      </div>
    </div>
    )
}