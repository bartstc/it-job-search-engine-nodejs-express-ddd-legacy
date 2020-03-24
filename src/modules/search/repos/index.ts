import { getRepository } from "typeorm";

import { Employer, User } from "shared/infra/database/typeorm/models";
import { TypeormEmployerRepo } from "./implementations/typeormEmployerRepo";

const employerRepository = getRepository(Employer);
const userRepository = getRepository(User);

const employerRepo = new TypeormEmployerRepo(
  employerRepository,
  userRepository
);

export { employerRepo };
