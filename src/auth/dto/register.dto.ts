import { IsNotEmpty, IsString, MaxLength, IsOptional, IsDateString, IsEmail, IsEnum } from 'class-validator';
import { Gender } from '../../types/gender.enum';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    surname: string

    @IsDateString()
    @IsNotEmpty()
    dob: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    street: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    city: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    house: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    state: string

    @IsString()
    @IsOptional()
    @MaxLength(255)
    apartment?: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    zip: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    phone: string

    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    citizenship: string

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(255)
    email: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    password: string
}
