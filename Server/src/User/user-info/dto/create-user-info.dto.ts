import { Type } from 'class-transformer';
import {
  IsInt,
  IsPhoneNumber,
  IsPositive,
  IsString,
  IsArray,
  ValidateNested,
  IsUrl,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';

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

export class headerImageDto {
  @IsString()
  headerImageURL: string;
  @IsString()
  headerImageALT: string;
  @IsString()
  Position: string;
  @IsOptional()
  overlayOpacity : string ;
  @IsOptional()
  overlayColor : string
}

export class LoactionDto {
  @IsString()
  country: string; 
  @IsString()
  City: string;
}

export class EducationDto {
  @IsString()
  @IsNotEmpty()
  id: string; 
  @IsString()
  degree: "High School" | "Diploma" | "Associate" | "Bachelor"| "Master"| "Doctorate"| "Bootcamp"| "Certificate";
  @IsString()
  fieldOfStudy : string;
  @IsString()
  school : string ;
  @IsString()
  country : string ;
  @IsString()
  city : string ;
  @IsString()
  startDate : string ;
  @IsString()
  endDate : string ;
  @IsBoolean()
  isCurrent : boolean ;
  @IsString()
  grade : string | null ;
  @IsString()
  description : string | null ;
}

export class workExperienceDto {
  @IsString()
  jobTitle : string ;
  @IsString()
  companyName : string ;
  @IsString()
  employmentType : "full-time" |"part-time" |"contract" |"internship" |"freelance";
  @IsString()
  location : string ;
  @IsString()
  startDate : string ;
  @IsString()
  endDate : string ;
  @IsBoolean()
  stillWorking : boolean ;
  @IsString()
  description : string ;
  @IsArray()
  @IsString({ each: true })
  techStack: string[];
  @IsArray()
  @IsString({ each: true })
  achievements: string[];
  @IsString()
  projectLinks : string ;
}


export class CreateUserInfoDto {
  @IsInt()
  @IsPositive()
  userid: number;

  @IsPhoneNumber('IR')
  phone: string;

  @IsString()
  dateofbirth: string;

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

  @ValidateNested()
  @Type(()=> LoactionDto)
  Location : LoactionDto
  
  @ValidateNested()
  @Type(()=> headerImageDto)
  headerImage : headerImageDto


  @IsString()
  jobTitle: string;

  @ValidateNested()
  @Type(()=> EducationDto)
  Education : EducationDto[]

  @ValidateNested()
  @Type(()=> workExperienceDto)
  workExperience : workExperienceDto[]
}
