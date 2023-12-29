import { PartialType } from '@nestjs/swagger';
import { SignupDto } from './SignupDto';

export class SigninDto extends PartialType(SignupDto) {}
