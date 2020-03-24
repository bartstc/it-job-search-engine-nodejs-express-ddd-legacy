import { Employer } from "../domain";

export interface IEmployerRepo {
  exists(userId: string): Promise<boolean>;
  getEmployerByUserId(userId: string): Promise<Employer>;
  // getEmployerIdByUsername(username: string): Promise<EmployerId>;
  // getEmployerByUsername(username: string): Promise<Employer>;
  save(employer: Employer): Promise<void>;
}
