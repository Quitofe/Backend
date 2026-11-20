import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){

    }
    @Post('/register')
    registerUser(@Body()userObject: RegisterAuthDto){
        console.log(userObject);
        return this.authService.funRegister(userObject);    
    }

    @Post('/login')
    login(@Body()credenciales: LoginAuthDto){
        return this.authService.login(credenciales);
    }
}
