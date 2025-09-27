import { Type } from "class-transformer";
import {  
  IsInt, 
  IsPhoneNumber, 
  IsPositive, 
  IsString, 
  IsArray, 
  ValidateNested, 
  IsUrl, 
  IsOptional 
} from "class-validator";

export class SocialDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;
}

export class ResumeDto {
  @IsOptional()
  @IsString()
  file?: string;

  @IsOptional()
  @IsUrl()
  link?: string;
}

export class CreateUserInfoDto {
  @IsInt()
  @IsPositive()
  userid: number;

  @IsPhoneNumber('IR')
  phone: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  bio: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialDto)
  social: SocialDto[];

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsArray()
  @IsString({ each: true })
  learning_skills: string[];

  @ValidateNested()
  @Type(() => ResumeDto)
  resume: ResumeDto;

  @IsOptional()
  favorite: object; 
}
