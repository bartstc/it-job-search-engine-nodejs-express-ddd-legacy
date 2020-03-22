import {
  BaseEntity, Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn
} from "typeorm";

import { Offer } from "./Offer";
import { User } from "./User";
import { Comment } from "./Comment";
import { CommentVote } from "./CommentVote";

@Entity()
export class Employer extends BaseEntity {
  @PrimaryColumn()
  employerId!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @OneToOne(
    () => User,
    (user: User) => user.employer
  )
  user!: User;

  @Column()
  userId!: string;

  @OneToMany(
    () => Offer,
    offer => offer.employer
  )
  offers!: Offer[];

  @OneToMany(
    () => Comment,
    comment => comment.employer
  )
  comments!: Comment[];

  @OneToMany(
    () => CommentVote,
    commentVote => commentVote.employer
  )
  commentVotes!: CommentVote[];
}
