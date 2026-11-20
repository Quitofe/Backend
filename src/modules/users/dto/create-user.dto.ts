import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, IsEmail } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({ description: 'Nombre del usuario'})
    @IsString({message: 'El nombre debe ser una cadena de texto'})
    @IsNotEmpty({message: 'El nombre no puede estar vacío'})
    name: string;

    @ApiProperty({ description: 'Correo electrónico del usuario'})
    @IsEmail({} ,{message: 'El correo electrónico debe ser una cadena de texto válida'})
    @IsNotEmpty({message: 'El correo electrónico no puede estar vacío'})
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario'})
    @MinLength(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
    @IsString({message: 'La contraseña debe ser una cadena de texto'})
    password: string;
}
