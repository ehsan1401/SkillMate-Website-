

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
  profileImage : string ,
  Education : Education[]
};


export type HeaderImagesType = {
    headerName : string ,
    headerURL : string,
    headerALT : string
}