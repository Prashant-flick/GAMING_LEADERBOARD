import { Controller, Get, Param, Post } from "@nestjs/common";
import { LoadgeneratorService } from "./loadgenerator.service";

@Controller('loadgenerator')
export class LoadgeneratorController {
    constructor(private loadgeneratorService: LoadgeneratorService) {}

    @Post('noofusers/:number')
    async generateUsers(@Param('number') noofusers: number) {
        const startTime = Date.now();
        console.log("hi")
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
        for (let i=0; i<1e6; i++) {
            sum++;
        }
        return {sum};
    }

    @Get('cpu-async-test')
    async cpuAsyncTest() {
        await new Promise((res) => setTimeout(res, 50));
        return {message: 'done'};
    }

    @Get('keep-alive')
    keepAlive() {
        let sum=0;
        while(true) {
            sum--;
            sum++;
        }
    }
}