import { ReactNode } from "react"

export type GetPeopleInfoType = {
    ShowInSearch: boolean ,
    bio: string ,
    createAt: Date,
    dateofbirth: string,
    has_userinfo: boolean,
    learning_skills: string[],
    phone: string,
    profileImageUrl: string ,
    resume: { file: string, link: string} ,
    skills: string[],
    social: {
        url : string ,
        name : string
    }[],
    type: "NORMAL" | "PRO" | "ADMIN" ,
    userName: string
}

export type SocialsItem = {
    value: string, 
    label: ReactNode,
    EmptyIcon? : ReactNode
}



