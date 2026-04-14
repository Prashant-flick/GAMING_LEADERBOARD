import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { LoadgeneratorService } from "./loadgenerator.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.gaurd";

@UseGuards(JwtAuthGuard)
@Controller('loadgenerator')
export class LoadgeneratorController {
    constructor(private loadgeneratorService: LoadgeneratorService) {}

    @Post('noofusers/:number')
    async generateUsers(@Param('number') noofusers: number) {
        const startTime = Date.now();
        await this.loadgeneratorService.generateUsers(noofusers);

        const endTime = Date.now();
        const timeTakenMs = endTime - startTime;

        return {
            message: `Generated ${noofusers} users successfully`,
            timeTaken: `${timeTakenMs} ms`,
            timeTakenSeconds: `${(timeTakenMs / 1000).toFixed(2)} sec`
        };
    }

    @Post('noofscores/:number/scoreLimit/:scoreLimit')
    async generateScores(@Param('number') noofscores: number, @Param('scoreLimit') scoreLimit: number) {
        const startTime = Date.now();
        await this.loadgeneratorService.generateScore(noofscores, '', scoreLimit);

        const endTime = Date.now();
        const timeTakenMs = endTime - startTime;

        return {
            message: `Generated ${noofscores} scores succesfully`,
            timeTaken: `${timeTakenMs} ms`,
            timeTakenSeconds: `${(timeTakenMs / 1000).toFixed(2)} sec`
        }
    }

    @Post('game/:gameId/noofscores/:number/scoreLimit/:scoreLimit')
    async generateScoreForGame(@Param('gameId') gameId: string, @Param('number') noofscores: number, @Param('scoreLimit') scoreLimit: number) {
        const startTime = Date.now();
        await this.loadgeneratorService.generateScore(noofscores, gameId, scoreLimit);

        const endTime = Date.now();
        const timeTakenMs = endTime - startTime;

        return {
            message: `Generated ${noofscores} scores succesfully`,
            timeTaken: `${timeTakenMs} ms`,
            timeTakenSeconds: `${(timeTakenMs / 1000).toFixed(2)} sec`
        }
    }

    @Get('cpu-test')
    cpuTest() {
        let sum = 0;
        for (let i=0; i<1e8; i++) {
            sum += Math.sqrt(i);
            sum -= Math.sqrt(i);
        }
        return {sum};
    }

    @Get('cpu-async-test')
    async cpuAsyncTest() {
        await new Promise((res) => setTimeout(res, 50));
        return {message: 'done'};
    }

    @Get('keep-alive/time/:sec')
    keepAlive(@Param('sec') sec: number) {
        const start = Date.now();
        let sum = 0;

        while (Date.now() - start < sec * 1000) {
            sum++;
            sum--;
        }

        return { 
            message: `Loop ran for ${sec} seconds`,
            timeTaken: `${sec*1000} ms`,
            timeTakenSeconds: `${sec} sec`
        };
    }
}