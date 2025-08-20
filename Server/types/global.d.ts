import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      email: string;
      name: string;
    };
    userName?: string; 
    email: string;
    type :  "ADMIN" | "PRO" | "NORMAL" ;
    profileImageUrl?: string
    biography?: string
    lastLogin:Date
    createAt:Date
    updateAt:Date
}
}
