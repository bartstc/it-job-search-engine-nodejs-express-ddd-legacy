import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from "typeorm";

import { Employer } from "./Employer";
import { Offer } from "./Offer";
import { CommentVote } from "./CommentVote";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryColumn()
  commentId!: string;

  @Column()
  text!: string;

  @Column({ default: 0 })
  points!: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(
    () => Employer,
    employer => employer.comments,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  employer!: Employer;

  @ManyToOne(
    () => Offer,
    offer => offer.comments,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  offer!: Offer;

  @OneToMany(
    () => CommentVote,
    commentVote => commentVote.comment
  )
  votes!: CommentVote[];
}
