import { IsEmail, IsString } from "class-validator";

export class CreateUser {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  passCode: string;
}
