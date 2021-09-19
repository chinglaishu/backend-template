import { CacheModule, Global, Module } from "@nestjs/common";
import * as redisStore from 'cache-manager-redis-store';
import { REDIS_HOST, REDIS_PORT } from "../constant/config";

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: () => {
                return ({
                    redisStore,
                    host: REDIS_HOST,
                    port: REDIS_PORT,
                })
            },
        })
    ],
    exports: [CacheModule]
})
export class AppCacheModule {}
