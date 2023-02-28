import { useState } from "react";
import Message from "rsuite/Message";

const BugCounter = ({ message }) => {
  const [counter, setCounter] = useState(0);

  const onClickHandler = () => {
    setCounter((previousState) => previousState + 1);
  };

  if (counter === 2) {
    throw new Error("Bummmmmm");
  }
  return (
    <Message type="info" onClick={onClickHandler} style={{ cursor: "pointer" }}>
      <h6>
        <span style={{ cursor: "pointer" }}>{message}:</span> {counter}
      </h6>
    </Message>
  );
};

export default BugCounter;
