import { has } from "lodash";

import { Guard, Result } from "shared/core";
import { Entity, UniqueEntityID } from "shared/domain";

import { EmployerId } from "./employerId";
import { CommentText } from "./commentText";
import { OfferId } from "./offerId";
import { CommentVotes } from "./commentVotes";
import { CommentId } from "./commentId";
import { CommentVote } from "./commentVote";

export interface CommentProps {
  employerId: EmployerId;
  text: CommentText;
  offerId: OfferId;
  votes: CommentVotes;
  points: number;
}

export class Comment extends Entity<CommentProps> {
  get commentId(): CommentId {
    return CommentId.create(this._id).getValue();
  }

  get offerId(): OfferId {
    return this.props.offerId;
  }

  get employerId(): EmployerId {
    return this.props.employerId;
  }

  get text(): CommentText {
    return this.props.text;
  }

  get points(): number {
    let initialValue = this.props.points;
    return initialValue + this.computeVotePoints();
  }

  private computeVotePoints(): number {
    let tally = 0;

    for (let vote of this.props.votes.getNewItems()) {
      if (vote.isUpvote()) {
        tally++;
      }

      if (vote.isDownvote()) {
        tally--;
      }
    }

    for (let vote of this.props.votes.getRemovedItems()) {
      if (vote.isUpvote()) {
        tally--;
      }

      if (vote.isDownvote()) {
        tally++;
      }
    }

    return tally;
  }

  public removeVote(vote: CommentVote): Result<void> {
    this.props.votes.remove(vote);
    return Result.ok<void>();
  }

  public addVote(vote: CommentVote): Result<void> {
    this.props.votes.add(vote);
    return Result.ok<void>();
  }

  public getVotes(): CommentVotes {
    return this.props.votes;
  }

  public updateScore(totalNumUpvotes: number, totalNumDownvotes: number): void {
    this.props.points = totalNumUpvotes - totalNumDownvotes;
  }

  private constructor(props: CommentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CommentProps,
    id?: UniqueEntityID
  ): Result<Comment> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.employerId, argumentName: "employerId" },
      { argument: props.text, argumentName: "text" },
      { argument: props.offerId, argumentName: "offerId" }
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail<Comment>(nullGuard.message!);
    } else {
      const isNewComment = !!id;

      const defaultCommentProps: CommentProps = {
        ...props,
        points: has(props, "points") ? props.points : 0,
        votes: props.votes ? props.votes : CommentVotes.create([])
      };

      const comment = new Comment(defaultCommentProps, id);

      if (isNewComment) {
        comment.addVote(
          CommentVote.createUpvote(
            props.employerId,
            comment.commentId
          ).getValue()
        );
      }

      return Result.ok<Comment>(comment);
    }
  }
}
