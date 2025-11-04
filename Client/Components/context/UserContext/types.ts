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

export type SocialItem = {
  name: string;
  url: string;
};

export type FavoriteType = {
  People: number[];
  Projects: number[];
};

export type UserInfo = {
  dateofbirth: number;
  bio: string;
  favorite: FavoriteType;
  learning_skills: string[];
  phone: string;
  resume: object;
  skills: string[];
  social: SocialItem[]; 
};

export type UserContextType = {
  user: UserType | null;
  userInfo?: UserInfo | undefined;
  refreshUser: () => Promise<void>;
  refreshUserInfo? : ()=> Promise<void>
};