


export type UserInfo = {
  age: number;
  bio: string;
  favorite: object;
  learning_skills : Array<string>;
  phone : string;
  resume : object;
  skills : Array<string>;
  social: Array<object>;
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

export type SocialItem = {
  url: string;
  name: string;
};