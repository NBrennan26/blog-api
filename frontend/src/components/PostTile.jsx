import { Link } from "react-router-dom";

function PostTile({ post }) {
  return (
    <div>
      <section>
        <h1>
          <Link to={{ pathname: `/post/${post._id}` }}>{post.title}</Link>
        </h1>
      </section>
      <section>
        <p>{post.text}</p>
      </section>
    </div>
  );
}

export default PostTile;
