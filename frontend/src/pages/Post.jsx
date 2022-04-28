import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentTile from "../components/CommentTile";
import { getPost, reset } from "../features/posts/postSlice";
import { getComments, resetComment } from "../features/comments/commentSlice";

function Post() {
  const { postid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { posts, isError, isLoading, message } = useSelector(
    (state) => state.posts
  );
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comments);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getPost(postid));

    dispatch(getComments(postid));

    return () => {
      dispatch(reset());
      dispatch(resetComment());
    };
  }, [postid, isError, message, dispatch]);

  if (isLoading) {
    // Spinner...
  }

  return (
    <div className="post-page">
      <div className="post-cont">
        <div className="post-title-cont">
          <span className="post-title">{posts.title}</span>
          <div className="post-edit-cont">
            {user && user.admin && (
              <button
                className="post-edit-btn"
                onClick={() =>
                  navigate(`/update`, {
                    state: { post: posts, postId: postid },
                  })
                }
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="post-text-cont">
          <span className="post-text">{posts.text}</span>
        </div>
      </div>
      <CommentForm className="post-comment-form" />

      <section className="post-comment-cont">
        {comments.length > 0 ? (
          <div>
            {comments.map((comment) => (
              <CommentTile key={comment._id} comment={comment} />
            ))}
          </div>
        ) : (
          <h2>~There are not any Comments yet~</h2>
        )}
      </section>
    </div>
  );
}

export default Post;
