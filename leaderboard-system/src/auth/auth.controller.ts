import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() body: {email: string, password: string}) {
        return this.authService.signup(body.email, body.password);
    }

    @Post('signin')
    singin(@Body() body: {email: string, password: string}) {
        return this.authService.login(body.email, body.password);
    }
}