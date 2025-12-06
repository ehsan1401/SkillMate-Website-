import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';


export type ConnectionType = "sync" | "invite" | "request";
export type Status = "pending" | "accepted" | "rejected" | "cancelled";

export class BaseConnectionDTO {

    @IsString()
    type : ConnectionType

    @IsInt()
    @IsNotEmpty()
    senderId : number

    @IsInt()
    @IsNotEmpty()
    receiverId : number

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

export class SyncRequest extends BaseConnectionDTO {
    @IsInt()
    projectId?: number;

    @IsString()
    ReciverUserName : string

    @IsString()
    SenderUserName : string
}

export class InviteRequest extends BaseConnectionDTO {
    @IsInt()
    @IsNotEmpty()
    projectId: number;
}