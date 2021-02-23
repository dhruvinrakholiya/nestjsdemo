import { IsString, IsNotEmpty, IsEmail, MaxLength, IsOptional } from 'class-validator'
import { } from 'class-transformer'
export class SignUpForUsers {
    @IsNotEmpty()
    @IsString()
    first_name: String;

    @IsNotEmpty()
    @IsString()
    last_name: String;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: String;
    
    @IsNotEmpty()
    // @IsString()
    dob: String;

    @IsNotEmpty()
    @IsString()
    role: String;

    @IsNotEmpty()
    @IsString()
    gender: String;

    @IsOptional()
    @MaxLength(8)
    password: String;
}

export class LoginForUsers {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: String;

    @IsNotEmpty()
    @MaxLength(8)
    password: String;
}