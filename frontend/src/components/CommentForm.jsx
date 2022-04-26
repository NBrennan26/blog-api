import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createComment } from "../features/comments/commentSlice";

function CommentForm() {
  const dispatch = useDispatch();
  const [formDisplay, setFormDisplay] = useState({
    isDisplayed: false,
  });
  const [text, setText] = useState("");
  const { postid } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { comments, isError, message } = useSelector((state) => state.comments);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message, comments]);

  const toggleFormDisplay = () => {
    if (formDisplay.isDisplayed) {
      setFormDisplay({ isDisplayed: false });
    } else {
      setFormDisplay({ isDisplayed: true });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const commentData = {
      text,
      postid,
    };

    dispatch(createComment(commentData));
    setFormDisplay({ isDisplayed: false });
    setText("");
    window.location.reload(); // Reload page to populate user data
  };

  return (
    <>
      <div>
        {user && !formDisplay.isDisplayed ? (
          <>
            <button onClick={toggleFormDisplay}>Add Comment</button>
          </>
        ) : user && formDisplay.isDisplayed ? (
          <>
            <form onSubmit={onSubmit}>
              <div>
                <textarea
                  id="text"
                  name="text"
                  value={text}
                  placeholder="Provide Comment Content"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default CommentForm;
