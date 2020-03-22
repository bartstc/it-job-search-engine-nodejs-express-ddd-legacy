import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn
} from "typeorm";

import { VoteType } from "modules/search/domain/types";

import { Employer } from "./Employer";
import { Comment } from "./Comment";

@Entity()
export class CommentVote extends BaseEntity {
  @PrimaryColumn()
  commentVoteId!: string;

  @Column()
  type!: VoteType;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(
    () => Employer,
    employer => employer.commentVotes,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  employer!: Employer;

  @Column()
  employerId!: string;

  @ManyToOne(
    () => Comment,
    comment => comment.votes,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  comment!: Comment;

  @Column()
  commentId!: string;
}
