export type SocialLink = {
  name: string;
  url: string;
};

export type User = {
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
