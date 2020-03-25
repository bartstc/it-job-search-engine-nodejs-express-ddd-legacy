import { ConnectionOptions } from "typeorm";
import { Employer, User } from "./models";

const developmentConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [User, Employer],
  migrations: ["src/migration/**/*.ts"],
  synchronize: true,
  logging: true
};

const productionConfig: ConnectionOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL, // heroku db addons
  entities: [User, Employer],
  synchronize: false
};

const config =
  process.env.NODE_ENV === "production" ? productionConfig : developmentConfig;

export { config };
