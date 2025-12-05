import { ReactNode } from "react"
export type headerImageType = {
    Position: string
    overlayColor: string
    headerImageALT: string
    headerImageURL: string
    overlayOpacity: string
}

export type Education = {
  id: string;
  degree:
    | "High School"
    | "Diploma"
    | "Associate"
    | "Bachelor"
    | "Master"
    | "Doctorate"
    | "Bootcamp"
    | "Certificate";
  fieldOfStudy: string;
  school: string;
  country?: string;
  city?: string;
  startDate: string;
  endDate?: string | null;
  isCurrent?: boolean;
  grade?: string | null;
  description?: string | null;
};

export type workExperience = {
  jobTitle : string ;
  companyName : string ;
  employmentType : "full-time" | "part-time" | "contract" | "internship" | "freelance";
  location? : string  ;
  startDate: string ;
  endDate? : string ;
  stillWorking: boolean ;
  description? : string ;
  techStack? : string[];
  achievements?: string[];
  projectLinks?: string
}

export type GetPeopleInfoType = {
    ShowInSearch: boolean ,
    bio: string ,
    createAt: Date,
    dateofbirth: string,
    has_userinfo: boolean,
    learning_skills: string[],
    phone: string,
    profileImageUrl: string ,
    resume: { file: string, link: string} ,
    skills: string[],
    social: {
        url : string ,
        name : string
    }[],
    type: "NORMAL" | "PRO" | "ADMIN" ,
    userName: string,
    headerImage: headerImageType ,
    Location: {
        City : string,
        country : string
     } ,
    jobTitle: string ,
    Education : Education[],
    workExperience: workExperience[],
    Gender : "Male" | "Female" |"Other"

}
export type SocialsItem = {
    value: string, 
    label: ReactNode,
    EmptyIcon? : ReactNode
}



