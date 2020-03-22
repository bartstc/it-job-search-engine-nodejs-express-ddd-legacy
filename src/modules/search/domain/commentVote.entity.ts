import { Entity, UniqueEntityID } from "shared/domain";
import { Guard, Result } from "shared/core";

import { CommentId } from "./commentId";
import { EmployerId } from "./employerId";
import { VoteType } from "./types";

interface CommentVoteProps {
  commentId: CommentId;
  employerId: EmployerId;
  type: VoteType;
}

export class CommentVoteEntity extends Entity<CommentVoteProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get commentId(): CommentId {
    return this.props.commentId;
  }

  get employerId(): EmployerId {
    return this.props.employerId;
  }

  get type(): VoteType {
    return this.props.type;
  }

  public isUpvote(): boolean {
    return this.props.type === "UPVOTE";
  }

  public isDownvote(): boolean {
    return this.props.type === "DOWNVOTE";
  }

  private constructor(props: CommentVoteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CommentVoteProps,
    id?: UniqueEntityID
  ): Result<CommentVoteEntity> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.employerId, argumentName: "employerId" },
      { argument: props.commentId, argumentName: "commentId" },
      { argument: props.type, argumentName: "type" }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail(guardResult.message!);
    } else {
      return Result.ok(new CommentVoteEntity(props, id));
    }
  }

  public static createUpvote(
    employerId: EmployerId,
    commentId: CommentId
  ): Result<CommentVoteEntity> {
    const memberGuard = Guard.againstNullOrUndefined(employerId, "employerId");
    const postGuard = Guard.againstNullOrUndefined(commentId, "commentId");

    if (!memberGuard.succeeded) {
      return Result.fail(memberGuard.message!);
    }

    if (!postGuard.succeeded) {
      return Result.fail(postGuard.message!);
    }

    return Result.ok(
      new CommentVoteEntity({
        employerId,
        commentId,
        type: "UPVOTE"
      })
    );
  }

  public static createDownvote(
    employerId: EmployerId,
    commentId: CommentId
  ): Result<CommentVoteEntity> {
    const memberGuard = Guard.againstNullOrUndefined(employerId, "employerId");
    const postGuard = Guard.againstNullOrUndefined(commentId, "commentId");

    if (!memberGuard.succeeded) {
      return Result.fail(memberGuard.message!);
    }

    if (!postGuard.succeeded) {
      return Result.fail(postGuard.message!);
    }

    return Result.ok(
      new CommentVoteEntity({
        employerId,
        commentId,
        type: "DOWNVOTE"
      })
    );
  }
}
