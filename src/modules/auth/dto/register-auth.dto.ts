import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @MinLength(6)
    @MaxLength(25)
    @IsNotEmpty()
    password!: string;
}