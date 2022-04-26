import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function PostTile({ post }) {
  const { user } = useSelector((state) => state.auth);

  const confirmDelete = () => {
    confirmAlert({
      title: "Confirm Post Deletion",
      message: "Are you sure you want to permanently delete this post?",
      buttons: [
        {
          label: "Yes, Delete",
          onClick: () => console.log("Will Delete"),
        },
        {
          label: "NO! DO NOT DELETE!",
          onClick: () => console.log("Crisis Averted"),
        },
      ],
    });
  };

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
      {user && user.admin && (
        <section>
          <button onClick={confirmDelete}>X</button>
        </section>
      )}
    </div>
  );
}

export default PostTile;
