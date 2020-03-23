const authConfig = {
  secret: process.env.APP_SECRET,
  tokenExpiredTime: 300, // seconds => 5 minutes
  redisServerPort: process.env.REDIS_PORT || 6379,
  redisServerHost: process.env.REDIS_HOST
};

export { authConfig };
