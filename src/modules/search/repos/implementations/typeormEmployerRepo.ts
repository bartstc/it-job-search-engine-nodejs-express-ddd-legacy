import { IEmployerRepo } from "../employerRepo";
import { EmployerMap } from "../../mappers";
import { Employer } from "../../domain";
import { User } from "../../../users/domain";

export class TypeormEmployerRepo implements IEmployerRepo {
  private employerRepository: any;
  private userRepository: any;

  constructor(employerRepository: any, userRepository: any) {
    this.employerRepository = employerRepository;
    this.userRepository = userRepository;
  }

  async exists(userId: string): Promise<boolean> {
    const existingEmployer = await this.employerRepository.findOne({ userId });

    return !!existingEmployer;
  }

  async getEmployerByUserId(userId: string): Promise<Employer> {
    const employer: Employer = await this.employerRepository.findOne({
      userId
    });

    const user: User = await this.userRepository.findOne({ userId });

    if (!employer) throw new Error("Employer not found");
    if (!user) throw new Error("User not found");

    return EmployerMap.toDomain(employer, user);
  }

  async save(employer: Employer): Promise<void> {
    const employerExists = this.exists(employer.userId.id.toString());

    if (!!employerExists) return;

    const rawTypeormEmployer = await EmployerMap.toPersistence(employer);
    await this.userRepository.create(rawTypeormEmployer).save();
  }
}
