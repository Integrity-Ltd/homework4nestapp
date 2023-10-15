import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty({ required: false })
    password?: string;
    constructor(id: number, username: string, password?: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}