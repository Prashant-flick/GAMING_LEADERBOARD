import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { GameService } from "src/game/game.service";
import { ScoreService } from "src/score/score.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class LoadgeneratorService {
    constructor(private scoreService: ScoreService, private authService: AuthService, private userService: UserService, private gameService: GameService){}

    async generateUsers(noofusers: number) {
        for (let i = 0; i<noofusers; i++ ) {
            await this.authService.signup(faker.internet.email(), "test@123");
        }
    }

    async generateScore(nofoscores: number, gameId: string, scoreLimit: number) {
        const users = await this.userService.getAllUser();
        let games: any[] = [];
        if (gameId!=='') {
            const game = await this.gameService.getGameById(gameId);
            games.push(game);
        } else {
            games = await this.gameService.getAll();
        }
        for (let i=0; i<nofoscores; i++ ) {
            const userId = users[i%users.length].id;
            const gameId = games[Math.floor(Math.random()*games.length)].id;
            if (userId==null || gameId==null) return;
            const score = Math.floor(Math.random()*scoreLimit);
            await this.scoreService.submitScore(userId, gameId, score);
        }
    }


}