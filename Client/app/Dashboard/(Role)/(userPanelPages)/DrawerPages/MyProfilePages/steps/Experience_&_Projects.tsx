import { Button, Checkbox, DatePicker, Input, Select, Tag } from "antd"
import { UserInfo, workExperience } from "../pages/type"
import AutocompleteInput from "@/Components/elements/Autocomplete/AutocompleteInput"
import { useState } from "react";
import dayjs from "dayjs";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import TextArea from "antd/es/input/TextArea";
import EmptyFolder from "@/Icons/Vector/EmptyFolder";
import { EmployeeIcon } from "@/Icons/EmployeeIcon";
import { LinkIcon } from "@/Icons/LinkIcon";
import { BuildIcon } from "@/Icons/BuildIcon";
import { AchievementIcon } from "@/Icons/AchievementIcon";
import { TrashBin } from "@/Icons/TrashBin";
import { useModal } from "@/Components/context/ModalContext/ModalContext";

type  employmentType = "full-time" | "part-time" | "contract" | "internship" | "freelance";

export default function ExperienceAndProjects(
    { formData, setFormData } 
    : 
    { formData : UserInfo, setFormData: React.Dispatch<React.SetStateAction<UserInfo>> }
){
    const { showAlert } = useAlert();
    const { showModal } = useModal();
    
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;
    const [ExpForm, setExpForm] = useState<workExperience>({
        employmentType: "full-time" as employmentType,
        jobTitle: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        stillWorking: false,
        techStack : [],
        achievements : [],
        projectLinks:"",
        description: "",
    });
    const employmentTypes = [
        { value: "full-time", label: "full-time" },
        { value: "part-time", label: "part-time" },
        { value: "contract", label: "contract" },
        { value: "internship", label: "internship" },
        { value: "freelance", label: "freelance" }
    ];
    const WorkingLocationOptions = [
        "Remote" ,"On-site" , "Hybrid"
    ]
    const [TechStacks , setTechStacks] = useState<string[]>([])
    const [TechStack , setTechStack] = useState<string>('')
    const handleAddTechStack = ()=>{
        if(TechStacks.length < 6){
            setTechStacks( prev => [...prev, TechStack])
            setExpForm(prev => ({
                ...prev,
                techStack: [...(prev.techStack || []), TechStack]
            }));
            setTechStack("");
        }
    }
    const HandleCloseTech = (TechToRemove: string) => {
        setTechStacks(prev => prev.filter(s => s !== TechToRemove));
    };


    const [achievements , setAchievements] = useState<string[]>([])
    const [achievement , setAchievement] = useState<string>('')
    const handleAddAchievement = ()=>{
        if(achievements.length < 3){
            setAchievements( prev => [...prev, achievement])
            setExpForm(prev => ({
                ...prev,
                achievements: [...(prev.achievements || []), achievement]
            }));
            setAchievement("");
        }
    }
    const HandleCloseAchievement = (AchievementToRemove: string) => {
        setAchievements(prev => prev.filter(s => s !== AchievementToRemove));
    };


    const handleAddExperience = () => {
        if (ExpForm.projectLinks && !urlRegex.test(ExpForm.projectLinks)) {
            showAlert(
                "Invalid URL. Please enter a complete, clickable link (e.g., https://example.com).",
                "Error"
            );
            return;
        }
        setFormData(prev => ({
            ...prev,
            workExperience: [...prev.workExperience, ExpForm]
        }));

        setExpForm({
            employmentType: "full-time" as employmentType,
            jobTitle: "",
            companyName: "",
            location: "",
            startDate: "",
            endDate: "",
            stillWorking: false,
            techStack : [],
            achievements : [],
            projectLinks:"",
            description: "",
        });
        setTechStacks([]);
    };

    const HandleDeleteExperience = (jobTitle: string) => {
        setFormData(prev => ({
            ...prev,
            workExperience: prev.workExperience.filter(exp => exp.jobTitle !== jobTitle)
        }));
    };


    return(
        <div className="w-full lg:h-[450px] h-auto flex lg:flex-row flex-col">
            <div className="lg:w-1/2 w-full h-full p-2 flex flex-col gap-2">
                <div className="w-full flex gap-2">
                    <Input
                        className="font-vazir pt-1 w-[60%]"
                        placeholder="Type your Job Title"
                        value={ExpForm.jobTitle}
                        onChange={(e) =>
                            setExpForm(prev => ({ ...prev, jobTitle: e.target.value }))
                        }
                    />
                    <Select
                        placeholder="Select your employment Type"
                        options={employmentTypes}
                        value={ExpForm.employmentType}
                        style={{ width: "40%" }}
                        onChange={(val: string) =>
                        setExpForm(prev => ({ ...prev, employmentType: val as employmentType }))
                        }
                        className="font-vazir"
                    />
                </div>
                <div className="w-full flex gap-2">
                    <Input
                        className="font-vazir pt-1 w-[60%]"
                        placeholder="Enter company name"
                        value={ExpForm.companyName}
                        onChange={(e) =>
                            setExpForm(prev => ({ ...prev, companyName: e.target.value }))
                        }
                    />
                    <AutocompleteInput
                        width="40%"
                        value={ExpForm.location || ""}
                        options={WorkingLocationOptions}
                        placeholder="Where did you working?"
                        LetterLimit={15}
                        onChange={(val: string) =>
                        setExpForm(prev => ({ ...prev, location: val }))
                        }
                    />
                </div>
                <div className="w-full flex gap-2">
                    <DatePicker
                        picker="month"
                        style={{ width: "29%", height: "32px" }}
                        value={ExpForm.startDate ? dayjs(ExpForm.startDate) : null}
                        onChange={(date, dateString) =>
                        setExpForm(prev => ({ ...prev, startDate: dateString as string }))
                        }
                        placeholder="Start Date"
                        className="font-vazir"
                    />
                    <DatePicker
                        picker="month"
                        style={{ width: "29%", height: "32px" }}
                        value={ExpForm.endDate ? dayjs(ExpForm.endDate) : null}
                        onChange={(date, dateString) =>
                        setExpForm(prev => ({ ...prev, endDate: dateString as string }))
                        }
                        placeholder="End Date"
                        className="font-vazir"
                        disabled={ExpForm.stillWorking}
                    />
                    <Checkbox
                        checked={ExpForm.stillWorking}
                        onChange={(e) =>
                        setExpForm(prev => ({
                            ...prev,
                            stillWorking: e.target.checked,
                            endDate: e.target.checked ? "" : prev.endDate
                        }))
                        }
                        className="pt-[5px]"
                    >
                        <span className=" font-vazir text-xs">
                            Im still Working at this Position.
                        </span>
                    </Checkbox>
                </div>
                <div className="w-full flex gap-2">
                    <Input
                        className="font-vazir pt-1 w-[100%]"
                        placeholder="Project Link : https://example.com/..."
                        value={ExpForm.projectLinks}
                        onChange={(e) =>
                            setExpForm(prev => ({ ...prev, projectLinks: e.target.value }))
                        }
                    />
                </div>
                <div className="w-full flex gap-2">
                    <Input
                        className="font-vazir pt-1 w-[100%]"
                        placeholder="Add the technologies you use the most"
                        value={TechStack}
                        onChange={(e) =>
                            setTechStack(e.target.value)
                        }
                        onPressEnter={handleAddTechStack}
                        suffix={<span>{TechStacks.length}/6</span>}
                    />
                    <Button 
                        type="primary" 
                        variant="solid" 
                        color="purple" 
                        className="font-vazir pt-1"
                        onClick={handleAddTechStack}
                    >
                        Add TechStack
                    </Button>
                </div>
                <div className="">
                    {TechStacks.map((Tech : string)=>{
                        return(
                            <Tag
                                key={Tech}
                                closable={{
                                    'aria-label': 'Close Button',
                                }}
                                onClose={() => HandleCloseTech(Tech)}
                            >
                                {
                                    Tech.length > 15 ? `${Tech.slice(0,15)}...` : Tech
                                }
                            </Tag>
                        )
                    })}
                </div>
                <div className="w-full flex gap-2">
                    <Input
                        className="font-vazir pt-1 w-[100%]"
                        placeholder="What did you accomplish in this position?"
                        value={achievement}
                        onChange={(e) =>
                            setAchievement(e.target.value)
                        }
                        onPressEnter={handleAddAchievement}
                        suffix={<span>{achievements.length}/3</span>}
                    />
                    <Button 
                        type="primary" 
                        variant="solid" 
                        color="purple" 
                        className="font-vazir pt-1"
                        onClick={handleAddAchievement}
                    >
                        Add Achievement
                    </Button>
                </div>
                <div className="">
                    {achievements.map((achiev : string)=>{
                        return(
                            <Tag
                                key={achiev}
                                closable={{
                                    'aria-label': 'Close Button',
                                }}
                                onClose={() => HandleCloseAchievement(achiev)}
                            >
                                {
                                    achiev.length > 20 ? `${achiev.slice(0,20)}...` : achiev
                                }
                            </Tag>
                        )
                    })}
                </div>
                <div className="relative">
                <TextArea
                    value={ExpForm.description}
                    onChange={(e) => {
                    const val = e.target.value;
                    setExpForm(prev => ({ ...prev, description: val.length <= 150 ? val : prev.description }));
                    }}
                    placeholder="Description"
                    style={{ height: 80, resize: 'none', width: "100%" }}
                    className="font-vazir"
                />
                    <div className="absolute bottom-1 right-2 text-sm text-gray-400 font-vazir">
                        {ExpForm.description?.length}/150
                    </div>
                </div>

                <Button type="primary" onClick={handleAddExperience} className="font-vazir pt-1">
                    Add Experience
                </Button>
            </div>
            <div className="lg:w-1/2 w-full lg:h-[88%] h-auto overflow-y-auto overflow-x-hidden px-2 pb-2">
                {formData.workExperience.length === 0 ? (
                <div className="flex flex-col justify-center items-center gap-3 w-full h-full">
                    <EmptyFolder width={200} opacity={0.5}/>
                    <p className="text-gray-500 pl-10 font-vazir">No Experience added yet.</p>
                </div>
                ) : (
                formData.workExperience.map(item => (
                    <div key={item.jobTitle} className="p-4 shadow-md rounded-lg bg-neutral-50 dark:bg-neutral-800 mb-4">
                        <h2 className="flex gap-2 relative">
                            <EmployeeIcon className="text-xl mt-[0px] text-blue-400 "/>
                            <span className="font-vazir">
                                <span className="font-bold">{item.jobTitle}</span> at <span className="text-sm">{item.companyName}</span>
                            </span>
                            <button 
                                className="absolute right-0 top-0 hover:text-red-500 transition-all duration-100"
                                onClick={() =>
                                    showModal(
                                    <div className="flex justify-center items-center">
                                        Are you sure you want to delete this work experience? This action cannot be undone.
                                    </div>,
                                    "Confirm Delete",
                                    ()=>{return false},
                                    "❌ Error!",
                                    500,
                                    200,
                                    ({ hideModal }) => [
                                        <Button key="cancel" onClick={hideModal} type="default" className="font-vazir pt-1">
                                            Cancel
                                        </Button>,
                                        <Button key="ok" onClick={()=>{
                                            hideModal() ;
                                            HandleDeleteExperience(item.jobTitle)
                                        }} type="primary" variant="solid" color="danger" className="font-vazir pt-1">
                                            Delete
                                        </Button>,
                                    ]
                                    )
                                }
                            >
                                <TrashBin className="text-xl"/>
                            </button>
                        </h2>
                        <p className="pl-8">
                            <span className="flex">
                                <span className="text-sm font-vazir">{item.employmentType} •  </span>
                                
                                <span className="text-xs font-vazir pl-1 pt-[2px]">
                                    From {ConvertDate(item.startDate)} to 
                                    <span className="pl-[2px]">
                                    {
                                        item.endDate ? (
                                            item.endDate !== "" ? ConvertDate(item.endDate) : "Now" 
                                        ) : "Now"
                                    }
                                    </span>
                                </span>
                                {   item.location &&
                                    <span className="text-xs font-vazir pl-[2px] pt-[2px]"> • Location: {item.location} </span>
                                }
                            </span>
                            <span>
                                {item.projectLinks &&
                                    <a className="text-xs flex gap-1 py-2" href={item.projectLinks}>
                                    <LinkIcon className="text-base" />
                                    <span>
                                        {item.projectLinks.length > 70 ? `${item.projectLinks.slice(0 , 70)}...` : item.projectLinks}
                                    </span>
                                    </a>
                                }
                            </span>
                            <span className="pb-6 bg-red-500">
                                {item.techStack ?
                                <>
                                    {item.techStack?.length > 0 && (
                                        <span className="text-xs flex gap-1">
                                           <BuildIcon className="text-lg" /> Built with {item.techStack.join(", ")}
                                        </span>
                                    )}
                                </>
                                :
                                null
                                }
                            </span>
                            <span className="">
                                {item.techStack ?
                                <>
                                    {item.techStack?.length > 0 && (
                                        <span className="text-xs">
                                           <span className="text-xs flex pt-2">
                                                <AchievementIcon className="text-lg" /> What I Learned: 
                                           </span>
                                           <span className="flex flex-col">
                                                {item.achievements?.map((achievementItem)=>{
                                                    return(
                                                        <p className="text-[12px] pl-5 mb-1" key={achievementItem}>
                                                            • {achievementItem}
                                                        </p>
                                                    )
                                                })}
                                           </span>
                                        </span>
                                    )}
                                </>
                                :
                                null
                                }
                            </span>
                            {item.description &&
                                <span className="text-xs py-1">
                                    {item.description}
                                </span>
                            }
                        </p>
                    </div>
                ))
                )}
            </div>
        </div>
    )
}

const ConvertDate = (date: string | null) => {
  if (!date) return "";
  return dayjs(date, "YYYY-MM").format("MMMM YYYY");
};