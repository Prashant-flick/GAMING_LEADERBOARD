import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {};

    async createUser(email: string, password: string) {
        const user = await this.prisma.user.create({
            data: {
                email,
                password
            }
        })
        return user;
    }

    async getUserByEmail(email: string) {
        return await this.prisma.user.findFirst({
            where: {
                email
            }
        })
    }

    async getUserById(userId: string) {
        return await this.prisma.user.findUnique({
            where: {id: userId}
        })
    }

    async getAllUser() {
        return await this.prisma.user.findMany();
    }
}