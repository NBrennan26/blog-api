import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header>
      <div className="header-home-cont">
        <Link to="/">Blog</Link>
      </div>
      <div className="header-link-cont">
        <ul className="header-list">
          {user && user.admin ? (
            <>
              <li className="header-list-item">
                <Link to="create">Create Post</Link>
              </li>
              <li className="header-list-item">
                <button onClick={onLogout} className="header-btn">
                  Log Out
                </button>
              </li>
            </>
          ) : user ? (
            <li className="header-list-item">
              <button onClick={onLogout} className="header-btn">
                Log Out
              </button>
            </li>
          ) : (
            <>
              <li className="header-list-item">
                <Link to="/login">Log In</Link>
              </li>
              <li className="header-list-item">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
