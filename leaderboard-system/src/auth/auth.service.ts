import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async signup(email: string, password: string) {
        const existingUser = await this.userService.getUserByEmail(email);

        if (existingUser) {
            throw new ConflictException("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user  = await this.userService.createUser(email, hashedPassword);

        return {
            message: "user created successfully",
            userId: user.id
        }
    }

    async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException("Invalid Credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException("Invalid Credentials");
        }

        const payload = {
            sub: user.id,
            email: user.email
        }

        const accessToken = this.jwtService.sign(payload);

        return {
            access_token: accessToken,
            user: {
                userId: user.id,
                email: user.email
            }
        }
    }


}