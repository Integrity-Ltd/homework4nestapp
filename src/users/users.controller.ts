import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name?: string) {
    return this.userService.findAll(name);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User, description: 'The found user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get('me')
  getMyUser(@Req() req: Request) {
    const result = this.userService.getMyUser(req);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User, description: 'The found user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const result = this.userService.findById(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
}
