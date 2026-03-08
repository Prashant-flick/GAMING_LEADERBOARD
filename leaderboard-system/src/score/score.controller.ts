import { Body, Controller, Post } from "@nestjs/common";
import { ScoreService } from "./score.service";

@Controller('scores')
export class ScoreController {
    constructor(private scoreService: ScoreService) {}

    @Post()
    submitScore(@Body() body: {gameId: string, userId: string, score: number}) {
        return this.scoreService.submitScore(body.userId, body.gameId, body.score)
    }
}