import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./user.controller";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";

@Module({
    imports: [PrismaModule],
    providers: [UserService, JwtAuthGuard],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {};