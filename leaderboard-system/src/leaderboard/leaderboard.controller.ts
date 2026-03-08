import { Body, Controller, Get } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";

@Controller('leaderboards')
export class LeaderboardController {
    constructor(private leaderboardService: LeaderboardService) {}

    @Get()
    getTopPlayer(@Body() body: {gameId: string, limit: number}) {
        return this.leaderboardService.getTopPlayers(body.gameId, body.limit);
    }

    @Get()
    getRank(@Body() body: {gameId: string, userId: string}) {
        return this.leaderboardService.getRank(body.userId, body.gameId);
    }
}