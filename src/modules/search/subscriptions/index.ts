import { AfterUserCreated } from "./afterUserCreated";
import { createEmployerUseCase } from "../useCases/employers/createEmployer";

new AfterUserCreated(createEmployerUseCase);
