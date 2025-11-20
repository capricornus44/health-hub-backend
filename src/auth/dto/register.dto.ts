import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string
}
