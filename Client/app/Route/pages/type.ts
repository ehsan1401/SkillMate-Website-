

export type SocialItem = {
  name: string;
  url: string;
};

export type FavoriteType = {
  People: number[];
  Projects: number[];
}

export type ResumeType = {
  file: string;
  link: string;
}

export type HeaderImagesType = {
    headerName : string ,
    headerURL : string,
    headerALT : string
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



export type UserInfo = {
  jobTitle : string ;
  dateofbirth: string;
  bio: string;
  favorite: FavoriteType;
  learning_skills: string[];
  phone: string;
  resume: ResumeType;
  skills: string[];
  social: SocialItem[]; 
  headerImage : {
    headerImageURL: string,
    headerImageALT: string,
    Position: "Top" | "Center" | "Bottom",
    overlayOpacity: string,
    overlayColor: string,
  };
  Location : {
    City : string,
    country : string
  };
  profileImage: string | File;
  Education : Education[];
  workExperience: workExperience[]
};
