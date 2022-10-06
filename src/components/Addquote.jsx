import { useContext } from "react";
import { CardContext } from "./Cards";

export default function Addquote() {
  const { inputRef, textareaRef, editProp, editHandleClick, handleClick } =
    useContext(CardContext);
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
      <button onClick={editProp.isEdit ? editHandleClick : handleClick}>
        Add
      </button>
    </>
  );
}
