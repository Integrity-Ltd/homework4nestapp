import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async getMyUser(req: Request) {
        const decodedUser = req.user as { id: number, username: string };
        const user = await this.prisma.systemuser.findFirst({ where: { id: decodedUser.id } });
        if (!user) {
            throw new NotFoundException("User not found")
        }
        delete user.password;
        return user;
    }

    findById(id: number) {
        const result = this.prisma.systemuser.findFirst({ where: { id: id }, select: { id: true, username: true } });
        return result;
    }

    findAll(name?: string) {
        if (name) {
            const result = this.prisma.systemuser.findMany({ where: { username: name }, select: { id: true, username: true } });
            return result;
        } else {
            return this.prisma.systemuser.findMany({ select: { id: true, username: true } });
        }
    }

    create(createUserDto: CreateUserDto) {
        const newUser = this.prisma.systemuser.create({ data: createUserDto });
        return newUser
    }
}
