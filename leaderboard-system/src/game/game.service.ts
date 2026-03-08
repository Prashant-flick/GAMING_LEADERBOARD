import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService) {}

    async createGame(name: string) {
        await this.prisma.game.create({
            data: {
                name
            }
        })
    }

    async getGameById(id: string) {
        return await this.prisma.game.findUnique({
            where: {
                id
            }
        })
    }

    async getAll() {
        return await this.prisma.game.findMany();
    }
}