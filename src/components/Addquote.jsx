import { useContext, useRef } from "react";
import { CardContext } from "../App";
import axiosInstance from "../config";

export default function Addquote() {
  const inputRef = useRef();
  const textareaRef = useRef();
  const { getData } = useContext(CardContext);

  // reset the input box after click
  function resetInput() {
    inputRef.current.value = "";
    textareaRef.current.value = "";
  }

  //add quote to database
  function handleClick() {
    axiosInstance
      .post("/crudapp", {
        name: inputRef.current.value,
        quote: textareaRef.current.value,
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => getData());
    resetInput();
  }

  return (
    <>
      <div className="inputboxs">
        <input
          type="text"
          placeholder="Enter author name here"
          ref={inputRef}
        />
        <textarea
          name="data"
          id=""
          cols="35"
          rows="5"
          placeholder="Enter quotes here"
          ref={textareaRef}
        ></textarea>
      </div>
      <button onClick={handleClick}>
        Add
      </button>
    </>
  );
}
