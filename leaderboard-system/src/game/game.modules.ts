import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { GamesController } from "./game.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    providers: [GameService],
    exports: [GameService],
    imports: [PrismaModule],
    controllers: [GamesController]
})
export class GameModule {}