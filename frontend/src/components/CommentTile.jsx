import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteComment } from "../features/comments/commentSlice";

function CommentTile({ comment }) {
  const dispatch = useDispatch();
  const { postid } = useParams();
  const { user } = useSelector((state) => state.auth);

  const commentData = {
    postid,
    commentid: comment._id,
  };

  return (
    <div className="comment-tile-cont">
      <section className="comment-tile-head">
        <div className="comment-tile-user">{comment.user.username}</div>
        <div className="comment-tile-btn-cont">
          {user && user.username === comment.user.username && (
            <button
              className="comment-tile-btn"
              onClick={() => dispatch(deleteComment(commentData))}
            >
              X
            </button>
          )}
        </div>
      </section>
      <section className="comment-tile-body">
        <span className="comment-tile-text">{comment.text}</span>
        <span className="comment-tile-date">
          {new Date(comment.updatedAt).toLocaleString("en-US")}
        </span>
      </section>
    </div>
  );
}

export default CommentTile;
