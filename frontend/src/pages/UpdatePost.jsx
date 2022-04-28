import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePost, reset } from "../features/posts/postSlice";

function UpdatePost() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: location.state.post.title ? location.state.post.title : "",
    text: location.state.post.text ? location.state.post.text : "",
    published: location.state.post.published
      ? location.state.post.published
      : false,
  });

  const { title, text, published } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, message } = useSelector((state) => state.posts);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isError, message, navigate, dispatch]);

  const onChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        published: e.target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const postData = {
      postId: location.state.postId,
      title,
      text,
      published,
    };

    dispatch(updatePost(postData));
    setFormData({ title: "", text: "", published: false });
    navigate("/");
  };

  // if (isLoading) {
  //   // Spinner...
  // }

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <input
        type="text"
        id="title"
        name="title"
        className="post-form-title"
        value={title}
        placeholder="Provide a Title"
        onChange={onChange}
      />
      <textarea
        id="text"
        name="text"
        className="post-form-text"
        value={text}
        placeholder="Provide the main content of your blog post"
        onChange={onChange}
      />
      <div className="post-form-checkbox-cont">
        <input
          type="checkbox"
          id="published"
          name="published"
          className="post-form-checkbox"
          value={published}
          onChange={onChange}
          checked={published}
        />
        <label htmlFor="published">Publish</label>
      </div>
      <div className="post-form-btn-cont">
        <button className="post-form-btn" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}

export default UpdatePost;
