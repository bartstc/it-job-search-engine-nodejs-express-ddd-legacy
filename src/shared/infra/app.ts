import express, { Application } from "express";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { userRouter } from "modules/users/infra/http/routes";

const v1Router = express.Router();

v1Router.use("/users", userRouter);

class App {
  public app: Application;
  public port = process.env.PORT || 5000;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeControllers();
    this.handleProductionMode();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }

  public getServer(): Application {
    return this.app;
  }

  private initializeMiddleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors({ origin: "*" }));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(morgan("combined"));
  }

  private handleProductionMode(): void {
    if (process.env.NODE_ENV === "production") {
      this.app.use(express.static("client/build"));

      this.app.get("*", (_, res) => {
        res.sendFile(
          path.resolve(__dirname, "../client", "build", "index.html")
        );
      });
    }
  }

  private initializeControllers() {
    this.app.use("/api/v1", v1Router);
  }
}

export { App };
