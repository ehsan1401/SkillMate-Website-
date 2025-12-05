import { IsEmail, IsEnum, IsString } from 'class-validator';

export enum GenderType {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
export class CreateUser {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  passCode: string;

  @IsEnum(GenderType)
  Gender : GenderType

}
