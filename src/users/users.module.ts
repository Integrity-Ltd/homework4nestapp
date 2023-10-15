import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy]
})
export class UsersModule { }
