import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { HttpException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async funRegister(objUser: RegisterAuthDto) {
        const { password, email, name } = objUser;
        const plainToHash = await hash(password, 12);

        const newUser = this.userRepository.create({
            name,
            mail: email,             
            password: plainToHash,
        });

        return this.userRepository.save(newUser);
    }

    async login(credenciales: LoginAuthDto) {
        const { email, password} = credenciales;
        const user = await this.userRepository.findOne({ 
            where: { 
                mail: email 
            } 
        });
        if (!user) return new HttpException('Userio no encontrado', 404);

        const verification = await compare(password, user.password);

        if (!verification) return new HttpException('Credenciales inválidas', 401);
        
        let payload = { email: user.mail, id: user.id };
        const token = this.jwtService.sign(payload);
        return { user: user, token: token };
    }
}