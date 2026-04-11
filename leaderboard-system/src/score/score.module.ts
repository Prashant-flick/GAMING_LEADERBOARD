import { Module } from "@nestjs/common";
import { ScoreService } from "./score.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { LeaderboardModule } from "src/leaderboard/leaderboard.module";
import { ScoreController } from "./score.controller";

@Module({
    imports: [PrismaModule, LeaderboardModule],
    providers: [ScoreService],
    controllers: [ScoreController],
    exports: [ScoreService]
})
export class ScoreModule {};