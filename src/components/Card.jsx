import React from "react";
import { useContext } from "react";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { CardContext } from "./Cards";

export default function Card(props) {
  const { editingId, setEditingId } = useContext(CardContext);
  return (
    <>
      {editingId == props.id ? (
        ""
      ) : (
        <div className="card">
          <p className="quote-icon">
            {" "}
            <FaQuoteLeft />{" "}
          </p>
          <div className="info">
            <p className="quote">{`"${props.quote}"`}</p>
            <p className="user-name">{`- ${props.name}`}</p>
          </div>
          <div className="btns">
            <p onClick={props.deleteData}>
              <MdDeleteForever />
            </p>
            <p
              onClick={() => {
                props.editData();
                setEditingId(props.id);
              }}
            >
              <MdModeEditOutline />
            </p>
          </div>
        </div>
      )}
    </>
  );
}
