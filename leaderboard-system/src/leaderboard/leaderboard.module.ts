import { Module } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";
import { RedisModule } from "src/redis/redis.module";
import { LeaderboardController } from "./leaderboard.controller";

@Module({
    providers: [LeaderboardService],
    exports: [LeaderboardService],
    imports: [RedisModule],
    controllers: [LeaderboardController]
})
export class LeaderboardModule {};