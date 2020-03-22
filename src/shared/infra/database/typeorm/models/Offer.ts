import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn
} from "typeorm";

import { Technology, Level, EmploymentType } from "modules/search/domain/types";

import { Employer } from "./Employer";
import { Comment } from "./Comment";
import { Pin } from "./Pin";

@Entity()
export class Offer extends BaseEntity {
  @PrimaryColumn()
  offerId!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  companyName!: string;

  @Column()
  companyDescription!: string;

  @Column()
  technology!: Technology;

  @Column()
  level!: Level;

  @Column()
  employmentType!: EmploymentType;

  @Column()
  cityName!: string;

  @Column()
  streetName!: string;

  @Column()
  priceMin!: number;

  @Column()
  priceMax!: number;

  @Column("text", { array: true })
  mustHave!: string[];

  @Column("text", { array: true })
  niceToHave!: string[];

  @Column("decimal")
  longitude!: number;

  @Column("decimal")
  latitude!: number;

  @Column({ default: 0 })
  totalNumComments!: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(
    () => Employer,
    employer => employer.offers,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  employer!: Employer;

  @Column()
  employerId!: string;

  @OneToMany(
    () => Comment,
    comment => comment.offer
  )
  comments!: Comment[];

  @OneToOne(
    () => Pin,
    (pin: Pin) => pin.offer
  )
  @JoinColumn()
  pin!: Pin;
}
