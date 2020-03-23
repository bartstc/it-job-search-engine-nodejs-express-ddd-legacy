import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Unique
} from "typeorm";

import { Employer } from "./Employer";

@Entity()
@Unique(["email", "username"])
export class User extends BaseEntity {
  @PrimaryColumn()
  userId!: string;

  @Column()
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isAdminUser!: boolean;

  @Column({ default: false })
  isDeleted!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @OneToOne(
    () => Employer,
    (employer: Employer) => employer.user
  )
  @JoinColumn()
  employer!: Employer;
}
