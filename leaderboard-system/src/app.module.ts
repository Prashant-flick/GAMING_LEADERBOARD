import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.modules';
import { ScoreModule } from './score/score.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GameModule, ScoreModule, UserModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
