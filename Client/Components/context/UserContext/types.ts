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


export type UserContextType = {
  user: UserType | null;
  error: string | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};