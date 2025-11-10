export type UserType = {
  createAt : Date ; 
  lastLogin : Date ;
  updateAt : Date ; 
  email : string ;
  id : number ;
  profileImageUrl : string ;
  type : "NORMAL" | "ADMIN" | "PRO" ; 
  userName : string ; 
  inspection : number;
  ShowInSearch : boolean ;
  
}