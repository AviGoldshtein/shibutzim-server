import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          url: process.env.REDIS_URL, // TODO for the deployment it will be replaced by REDIS_URL=redis://redis-cache:6379
          ttl: 300000, // 5 minutes
        }),
      }),
    }),
  ],
  exports: [CacheModule],
})
export class CommonCacheModule {}
