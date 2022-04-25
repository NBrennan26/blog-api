import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import { getPost, reset } from "../features/posts/postSlice";

function Post() {
  const { postid } = useParams();
  const dispatch = useDispatch();

  const { posts, isError, isLoading, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getPost(postid));

    return () => {
      dispatch(reset());
    };
  }, [postid, isError, message, dispatch]);

  if (isLoading) {
    // Spinner...
  }

  return (
    <>
      <div>
        <h1>{posts.title}</h1>
        <p>{posts.text}</p>
      </div>
      <CommentForm />
      {/* Comments */}
    </>
  );
}

export default Post;
