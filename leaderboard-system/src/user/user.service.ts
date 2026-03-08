import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {};

    async createUser(email: string, password: string) {
        const hashedpassword = await bcrypt.hash(
            password,
            10
        )
        
        await this.prisma.user.create({
            data : {
                email,
                password: hashedpassword
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