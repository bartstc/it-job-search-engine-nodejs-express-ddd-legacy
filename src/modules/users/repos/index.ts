import { getRepository } from "typeorm";

import { User } from "shared/infra/database/typeorm/models";
import { TypeormUserRepo } from "./implementations/typeormUserRepo";

const userRepository = getRepository(User);
const userRepo = new TypeormUserRepo(userRepository);

export { userRepo };
