import { Entity, UniqueEntityID } from "shared/domain";
import { Result } from "shared/core";

export class CommentId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<CommentId> {
    return Result.ok(new CommentId(id));
  }
}
