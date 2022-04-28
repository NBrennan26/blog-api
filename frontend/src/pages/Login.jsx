import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    // Spinner...
  }

  return (
    <div className="user-form-cont">
      <form className="user-form" onSubmit={onSubmit}>
        <div className="user-username-cont user-form-elem">
          <input
            type="text"
            id="username"
            name="username"
            className="user-form-field"
            value={username}
            placeholder="Username"
            onChange={onChange}
          />
        </div>
        <div className="user-form-elem">
          <input
            type="password"
            id="password"
            name="password"
            className="user-form-field"
            value={password}
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <div className="user-submit-cont">
          <button className="user-submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
