import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>(
          'REDIS_URL',
          'redis://localhost:6379',
        );
        const url = new URL(redisUrl);

        const store = await redisStore({
          socket: {
            host: url.hostname,
            port: Number(url.port) || 6379,
          },
          ttl: 30_000, // TTL padrão: 30 segundos (em ms)
        });

        return {
          store: store as unknown as CacheStorage,
        };
      },
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
