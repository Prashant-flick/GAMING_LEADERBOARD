import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LeaderboardService } from "src/leaderboard/leaderboard.service";

@Injectable()
export class ScoreService {
    constructor(private prisma: PrismaService, private leaderboard: LeaderboardService) {}

    async submitScore(userId: string, gameId: string, score: number) {
        await this.prisma.score.create({
            data: { userId, gameId, score },
        })

        await this.leaderboard.addScore(gameId, userId, score);
    }
}