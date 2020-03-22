import { WatchedList } from "shared/domain/WatchedList";

import { Comment } from "./comment.entity";

export class CommentsList extends WatchedList<Comment> {
  private constructor(initialVotes: Comment[]) {
    super(initialVotes);
  }

  public compareItems(a: Comment, b: Comment): boolean {
    return a.equals(b);
  }

  public static create(comments?: Comment[]): CommentsList {
    return new CommentsList(comments ? comments : []);
  }
}
