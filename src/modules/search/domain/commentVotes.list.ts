import { WatchedList } from "shared/domain/WatchedList";

import { CommentVote } from "./commentVote.entity";

export class CommentVotesList extends WatchedList<CommentVote> {
  private constructor(initialVotes: CommentVote[]) {
    super(initialVotes);
  }

  public compareItems(a: CommentVote, b: CommentVote): boolean {
    return a.equals(b);
  }

  public static create(initialVotes?: CommentVote[]): CommentVotesList {
    return new CommentVotesList(initialVotes ? initialVotes : []);
  }
}
