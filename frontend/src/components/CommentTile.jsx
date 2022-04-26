import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../features/comments/commentSlice";

function CommentTile({ comment }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div>CommentTile</div>
      <section>
        <p>{comment.user.username}</p>
        <p>{comment.text}</p>
        <p>{new Date(comment.updatedAt).toLocaleString("en-US")}</p>
      </section>
      {user && user.username === comment.user.username && (
        <button onClick={() => dispatch(deleteComment(comment._id))}>X</button>
      )}
    </>
  );
}

export default CommentTile;
