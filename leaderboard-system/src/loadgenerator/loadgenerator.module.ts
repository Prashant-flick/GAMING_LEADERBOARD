import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { GameModule } from "src/game/game.modules";
import { ScoreModule } from "src/score/score.module";
import { UserModule } from "src/user/user.module";
import { LoadgeneratorController } from "./loadgenerator.controller";
import { LoadgeneratorService } from "./loadgenerator.service";

@Module({
    imports: [GameModule, UserModule, ScoreModule, AuthModule],
    controllers: [LoadgeneratorController],
    providers: [LoadgeneratorService]
})
export class LoadgeneratorModule {};