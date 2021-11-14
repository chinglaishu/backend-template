import { createClient } from "redis";
import { RedisClient } from "redis";
import { APP_ENV, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "src/constant/config";

const createRedisClient = () => {
  if (APP_ENV === "TEST") {return null; }
  return createClient({
    url: `redis://${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
  });
}

export const redisClient = createRedisClient();

export const redisHelper = {
  async setRedisKey(cache: RedisClient, key: string, value: any, ttl: number) {
    return new Promise((resolve, reject) => {
      cache.set(key, value, "EX", ttl, (err, val) => {
      if (err) {
        reject(err);
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
   
      try {
       resolve(
        JSON.parse(val)
       )
      } catch (ex) {
        resolve(val)
      }
     })
    });
  },
  async getRedisKey (cache: RedisClient, key: string) {
    return new Promise((resolve, reject) => {
      cache.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
   
      try {
       resolve(
        JSON.parse(val)
       )
      } catch (ex) {
       resolve(val)
      }
     })
    });
  },
  async delRedisKey(cache: RedisClient, key: string) {
    return new Promise((resolve, reject) => {
      cache.del(key, (err, val: number) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
   
      try {
       resolve(
        val
       )
      } catch (ex) {
       resolve(val)
      }
     })
    });
  }  
};
