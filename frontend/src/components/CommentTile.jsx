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
    <>
      <div>CommentTile</div>
      <section>
        <p>{comment.user.username}</p>
        <p>{comment.text}</p>
        <p>{new Date(comment.updatedAt).toLocaleString("en-US")}</p>
      </section>
      {user && user.username === comment.user.username && (
        <button onClick={() => dispatch(deleteComment(commentData))}>X</button>
      )}
    </>
  );
}

export default CommentTile;
