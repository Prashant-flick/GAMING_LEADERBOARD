import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ScoreService } from "./score.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";

@UseGuards(JwtAuthGuard)
@Controller('scores')
export class ScoreController {
    constructor(private scoreService: ScoreService) {}

    @Post()
    submitScore(@Body() body: {gameId: string, userId: string, score: number}) {
        return this.scoreService.submitScore(body.userId, body.gameId, body.score)
    }
}