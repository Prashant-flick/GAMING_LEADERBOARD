import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() body: {email: string, password: string}) {
        return this.userService.createUser(body.email, body.password);
    }

    @Get()
    getUsers() {
        return this.userService.getAllUser();
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }
}