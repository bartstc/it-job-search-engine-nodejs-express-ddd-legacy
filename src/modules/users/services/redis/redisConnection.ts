import redis from "redis";
import { authConfig } from "config";

const port = authConfig.redisServerPort as number;
const host = authConfig.redisServerHost;
const redisConnection =
  process.env.NODE_ENV === "production"
    ? redis.createClient()
    : redis.createClient(port, host); // creates a new client

redisConnection.on("connect", () => {
  console.log(`[Redis]: Connected to redis server at ${host}:${port}`);
});

export { redisConnection };
