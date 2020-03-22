import { WatchedList } from "../../../shared/domain/WatchedList";
import { CommentVoteEntity } from "./commentVote.entity";

export class CommentVotesList extends WatchedList<CommentVoteEntity> {
  private constructor(initialVotes: CommentVoteEntity[]) {
    super(initialVotes);
  }

  public compareItems(a: CommentVoteEntity, b: CommentVoteEntity): boolean {
    return a.equals(b);
  }

  public static create(initialVotes?: CommentVoteEntity[]): CommentVotesList {
    return new CommentVotesList(initialVotes ? initialVotes : []);
  }
}
