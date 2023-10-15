import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/SignupDto';
import { SigninDto } from './dto/SigninDto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private jwt: JwtService) { }

    async signup(signupDto: SignupDto) {
        const exists = await this.prisma.systemuser.findFirst({
            where: { username: signupDto.username },
        });
        if (exists) {
            throw new BadRequestException('Username already exists');
        }
        const { username, password } = signupDto;
        const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
        const user = await this.prisma.systemuser.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        delete user.password;
        return user;
    }

    async login(signinDto: SigninDto, req: Request, res: Response) {
        const { username, password } = signinDto;

        const foundUser = await this.prisma.systemuser.findFirst({
            where: {
                username: username,
            },
        });

        if (!foundUser) {
            throw new BadRequestException('Wrong credentials');
        }

        const compareSuccess = await bcrypt.compare(password, foundUser.password);

        if (!compareSuccess) {
            throw new BadRequestException('Wrong credentials');
        }

        const token = await this.signToken(
            foundUser.id,
            foundUser.username,
        );

        if (!token) {
            throw new ForbiddenException('Could not signin');
        }

        res.cookie('token', token, {});

        return res.send({ message: 'Logged in succefully' });

    }

    async logout(req: Request, res: Response) {
        res.clearCookie('token');
        return res.send({ message: 'Logged out succefully' });

    }

    async signToken(id: number, username: string) {
        const payload = {
            id,
            username,
        };

        const token = await this.jwt.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });

        return token;
    }
}
