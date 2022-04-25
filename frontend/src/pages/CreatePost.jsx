import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost, reset } from "../features/posts/postSlice";

function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    published: false,
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
      console.log(e.target);
      console.log("Check clicked");
      console.log(e.target.checked);
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
      title,
      text,
      published,
    };

    dispatch(createPost(postData));
    setFormData({ title: "", text: "", published: false });
    navigate("/");
  };

  // if (isLoading) {
  //   // Spinner...
  // }

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
          <label htmlFor="published">Publish</label>
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default CreatePost;
