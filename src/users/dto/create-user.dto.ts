import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length, MaxLength, MinLength, min } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @MaxLength(256)
    username: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @Length(3, 32, { message: "Password must be between 3 and 32 characters" })
    password?: string;
}