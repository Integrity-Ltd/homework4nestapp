import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { sign } from 'crypto';
import { SignupDto } from './dto/SignupDto';
import { SigninDto } from './dto/SigninDto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  login(@Req() req: Request, @Res() res: Response, @Body() signinDto: SigninDto) {
    return this.authService.login(signinDto, req, res);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
}
