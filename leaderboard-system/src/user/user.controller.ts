import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.getAllUser();
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }
}