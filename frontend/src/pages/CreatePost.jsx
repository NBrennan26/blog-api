import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost, reset } from "../features/posts/postSlice";

function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    published: "",
  });

  const { title, text, published } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { posts, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [posts, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("onSubmit fired")

    const postData = {
      title, 
      text,
      published
    }

    dispatch(createPost(postData))
    setFormData({})
  };

  if (isLoading) {
    // Spinner...
  }

  return (
    <>
      <div>CreatePost</div>
      <section>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Provide a Title"
            onChange={onChange}
          />
          <textarea
            id="text"
            name="text"
            value={text}
            placeholder="Provide the main content of your blog post"
            onChange={onChange}
          />
          <input
            type="checkbox"
            id="published"
            name="published"
            value={published}
            onChange={onChange}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default CreatePost;
