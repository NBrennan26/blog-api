import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { RiCloseCircleLine } from "react-icons/ri";
import { deletePost } from "../features/posts/postSlice";

function PostTile({ post }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const confirmDelete = () => {
    confirmAlert({
      title: "Confirm Post Deletion",
      message: "Are you sure you want to permanently delete this post?",
      buttons: [
        {
          label: "Yes, Delete",
          onClick: () => dispatch(deletePost(post._id)),
        },
        {
          label: "NO! DO NOT DELETE!",
          onClick: () => console.log("Crisis Averted"),
        },
      ],
    });
  };

  const textSample = post.text.slice(0, 50) + "...";

  return (
    <div className="post-tile-cont">
      <Link to={{ pathname: `/post/${post._id}` }}>
        <section className="post-tile-title">
          <span>{post.title}{!post.published && " (unpublished)"}</span>
        </section>
        <section className="post-tile-text">
          <p>{textSample}</p>
        </section>
      </Link>
      {user && user.admin && (
        <section className="post-tile-btn-cont">
          <button className="post-tile-btn" onClick={confirmDelete}>
            <RiCloseCircleLine className="post-tile-btn-icon" />
          </button>
        </section>
      )}
    </div>
  );
}

export default PostTile;
