import { Link } from "react-router-dom";

function PostTile({ post }) {
  return (
    <div>
      <section>
        <h1>
          <Link to={{ pathname: `/post/${post._id}` }}>{post.title}</Link>
          <span>{!post.published && " (unpublished)"}</span>
        </h1>
      </section>
      <section>
        <p>{post.text}</p>
      </section>
    </div>
  );
}

export default PostTile;
