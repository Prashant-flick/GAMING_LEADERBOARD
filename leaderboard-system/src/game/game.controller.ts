import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { GameService } from "./game.service";

@Controller('games')
export class GamesController {
    constructor(private gameService: GameService) {};

    @Post()
    createGame(@Body() Body: { name: string }) {
        return this.gameService.createGame(Body.name);
    }

    @Get()
    getGames() {
        return this.gameService.getAll();
    } 

    @Get(':id')
    getGame(@Param('id') id: string) {
        return this.gameService.getGameById(id);
    }
}