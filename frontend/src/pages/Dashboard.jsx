import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostTile from "../components/PostTile";
import { getPosts, reset } from "../features/posts/postSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { posts, isError, isLoading, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  if (isLoading) {
    // Spinner...
  }

  return (
    <>
      <section>
        <h1>Welcome to the Blog</h1>
      </section>

      <section>
        {posts.length > 0 ? (
          <div>
            {posts.map(
              (post) =>
                post.published && <PostTile key={post._id} post={post} />
            )}
          </div>
        ) : (
          <h2>There are not any Posts yet</h2>
        )}
      </section>
    </>
  );
}

export default Dashboard;
