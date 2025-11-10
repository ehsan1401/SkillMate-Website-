


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

export type UpdateUserState = { ok?: boolean; status?: number; message: string; data?: object };