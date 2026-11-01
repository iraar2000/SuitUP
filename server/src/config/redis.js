import { createClient } from 'redis'

// Initialise and connect the redis
export const redis = await createClient({
    url: process.env.REDIS_URL
})

redis.on('error', (err) => {
    console.log('Redis error', err);
})

export async function connectRedis() {
    await redis.connect();
    console.log('Redis connected successfully!');
}

