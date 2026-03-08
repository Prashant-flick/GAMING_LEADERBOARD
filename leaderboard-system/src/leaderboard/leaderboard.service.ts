import { Injectable } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class LeaderboardService {
    constructor(private redisService: RedisService) {}

    async addScore(gameId: string, userId: string, score: number) {
        const redis = this.redisService.getClient();

        const key = `leaderboard:${gameId}`;

        await redis.zadd(key, score, userId);
    }

    async getTopPlayers(gameId: string, limit: number) {
        const redis = this.redisService.getClient();

        const key = `leaderboard:${gameId}`;

        return redis.zrevrange(key, 0, limit -1, 'WITHSCORES');
    }

    async getRank(gameId: string, userId: string) {
        const redis = this.redisService.getClient();

        const key = `leaderboard:${gameId}`;

        return redis.zrevrank(key, userId);
    }
}