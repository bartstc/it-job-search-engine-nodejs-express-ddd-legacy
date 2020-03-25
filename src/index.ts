import { createConnection } from "typeorm";

import "./modules/search/subscriptions";
import { config } from "./shared/infra/database/typeorm/ormconfig";
import { App } from "./shared/infra/app";

const conn = async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
    console.log(`Is connected: ${connection.isConnected}`);
  } catch (err) {
    console.log("Error while connecting to the database", err);
    return err;
  }

  const app = new App();

  app.listen();
};

conn();
