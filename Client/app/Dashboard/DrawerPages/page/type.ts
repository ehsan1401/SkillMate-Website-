


export type SocialItem = {
  name: string;
  url: string;
};

export type UserInfo = {
  dateofbirth: number;
  bio: string;
  favorite: object;
  learning_skills: string[];
  phone: string;
  resume: object;
  skills: string[];
  social: SocialItem[]; 
};




export type UserType = {
  createAt : Date ; 
  lastLogin : Date ;
  updateAt : Date ; 
  email : string ;
  id : number ;
  profileImageUrl : string ;
  type : "NORMAL" | "ADMIN" | "PRO" ; 
  userName : string ; 
}

export type UpdateUserState = { ok?: boolean; status?: number; message: string; data?: any };