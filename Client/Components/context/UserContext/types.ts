import { UserType } from "@/Types/UserType";

export type SocialItem = {
  name: string;
  url: string;
};

export type FavoriteType = {
  People: number[];
  Projects: number[];
};

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

export type ResumeType = {
  file: string;
  link: string;
}

export type UserInfo = {
  dateofbirth: string;
  bio: string;
  favorite: FavoriteType;
  learning_skills: string[];
  phone: string;
  resume: ResumeType;
  skills: string[];
  social: SocialItem[]; 
  headerImage : headerImageType ;
  Location : {
    City: string,
    country: string
  };
  jobTitle : string ;
  Education : Education[] ;
  workExperience : workExperience[]
};

export type UserContextType = {
  user: UserType | null;
  userInfo?: UserInfo | undefined;
  refreshUser: () => Promise<void>;
  refreshUserInfo? : ()=> Promise<void>
  logout: () => void;
  mutate :()=>void
};