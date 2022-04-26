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
  const { user } = useSelector((state) => state.auth);

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
        {/* If user is admin, show all posts */}
        {/* Otherwise only show published posts */}
        {user && user.admin ? (
          <div>
            {posts.map((post) => (
              <PostTile key={post._id} post={post} />
            ))}
          </div>
        ) : posts.length > 0 ? (
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
