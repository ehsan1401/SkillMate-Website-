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

    return(
    <div className="w-full lg:h-[450px] h-auto flex flex-col gap-4 px-5 pt-5">
      <div className="lg:grid flex flex-col grid-cols-2 gap-x-5 gap-y-4 w-full">

        <div className="flex lg:flex-row flex-col lg:items-center gap-2 col-span-2 py-4">
          <label className="font-bold lg:w-[20%] w-full lg:text-right">Your Main Role / Job Title :</label>
          <div className="lg:w-[80%] w-[100%] flex gap-3">
            <AutocompleteInput
              LetterLimit={50}
              value={formData.jobTitle || ""}
              options={JobTitleOptions}
              placeholder="Type or select your main role"
              onChange={(val) => setFormData(prev => ({ ...prev, jobTitle: val }))}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2 col-span-2">
          <label className="font-bold lg:w-[10%] w-full lg:text-right">Your Skills:</label>
          <div className="lg:w-[90%] w-full flex lg:gap-3 gap-1">
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

        <div className="flex items-center gap-2 col-span-2 lg:px-6">
          <div className="w-[100%] flex flex-wrap lg:gap-3 gap-1">
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

        
        <div className="flex flex-col lg:flex-row items-center gap-2 col-span-2">
          <label className="font-bold lg:w-[20%] w-full lg:text-right">What your curently learning:</label>
          <div className="lg:w-[80%] w-full flex lg:gap-3 gap-1">
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

        <div className="flex items-center gap-2 col-span-2 lg:px-6">
          <div className="w-[100%] flex flex-wrap lg:gap-3 gap-1">
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