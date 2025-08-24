import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {

    @IsString()
    userName :string

    @IsEmail()
    email: string;

    @IsString()
    passCode: string;

    @IsString()
    RepassCode: string;
}