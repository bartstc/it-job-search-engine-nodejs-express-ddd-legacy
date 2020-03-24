import { CreateEmployerUseCase } from "./CreateEmployerUseCase";
import { userRepo } from "../../../../users/repos";
import { employerRepo } from "../../../repos";

const createEmployerUseCase = new CreateEmployerUseCase(userRepo, employerRepo);

export { createEmployerUseCase, CreateEmployerUseCase };
