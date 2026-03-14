import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";

@Controller('leaderboards')
export class LeaderboardController {
    constructor(private leaderboardService: LeaderboardService) {}

    @Get()
    getTopPlayer(
        @Query('gameId') gameId: string,
        @Query('limit') limit: number
    ) {
        return this.leaderboardService.getTopPlayers(gameId, limit);
    }

    @Get(":id")
    getRank(
        @Query('userId') userId: string,
        @Query('gameId') gameId: string
    ) {
        return this.leaderboardService.getRank(userId, gameId);
    }
}