import { useState } from "react";
import { useSelector } from "react-redux";

function CommentForm() {
  const [formDisplay, setFormDisplay] = useState({
    isDisplayed: false,
  });
  const [text, setText] = useState("");

  const { user } = useSelector((state) => state.auth);

  const toggleFormDisplay = () => {
    if (formDisplay.isDisplayed) {
      setFormDisplay({ isDisplayed: false });
    } else {
      setFormDisplay({ isDisplayed: true });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
