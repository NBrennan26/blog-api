import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    published: "",
  });

  const { title, text, published } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault()
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
          <button>Submit</button>
        </form>
      </section>
    </>
  );
}

export default CreatePost;
