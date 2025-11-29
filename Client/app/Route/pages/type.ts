

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
  profileImage : string
};


export type HeaderImagesType = {
    headerName : string ,
    headerURL : string,
    headerALT : string
}