import { UserType } from "@/Components/context/UserContext/types";

export type SocialLink = {
  name: string;
  url: string;
};

export type User = {
  id : number,
  userName: string;
  email: string;
  type: "NORMAL" | "ADMIN" | "PRO";
  profileImageUrl: string;
  phone?: string;
  dateofbirth?: string;
  bio?: string;
  social?: SocialLink[];
  skills?: string[];
  learning_skills?: string[];
};


export type SocialItem = {
  name: string;
  url: string;
};
export type favorite = {
  People: number[];
  Projects: number[];
}


export type UserInfo = {
  dateofbirth: number;
  bio: string;
  favorite: favorite;
  learning_skills: string[];
  phone: string;
  resume: object;
  skills: string[];
  social: SocialItem[]; 
};


export type RemoveFavoritePeopleButtonProps = {
  User: UserType;
  DeleteUserID: number;
  listofid : number[]
}

export type Resfavorite = {
  updatedFavorite : {
    People: number[];
    Projects: number[];
  },
  message : string

}