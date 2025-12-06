import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';


export type ConnectionType = "sync" | "invite" | "request";
export type Status = "pending" | "accepted" | "rejected" | "cancelled";

export class InviteRequest {

    @IsString()
    type : ConnectionType

    @IsInt()
    @IsNotEmpty()
    senderId : number

    @IsInt()
    @IsNotEmpty()
    receiverId : number

    @IsInt()
    @IsNotEmpty()
    projectId : number

    @IsString()
    status : Status

    @IsString()
    message : string

    @IsBoolean()
    seen : boolean

    @IsDate()
    respondedAt : Date

    @IsDate()
    createdAt : Date

    @IsDate()
    updatedAt : Date
    
}
