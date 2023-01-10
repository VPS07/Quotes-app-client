import React from "react";
import axiosInstance from "../config";
import { useContext } from "react";
import { MdDeleteForever, MdModeEditOutline, MdCheck } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { CardContext } from "../App";
import { useState } from "react";
import { useRef } from "react";

export default function Card(props) {
  const { getData } = useContext(CardContext);
  const [isEdit, setIsEdit] = useState(false);
  const [userName, setUserName] = useState(props.name);
  const quoteRef = useRef();
  const useNameRef = useRef();

  //Deleting the data from database
  function deleteData(id) {
    axiosInstance
      .delete(`/crudapp/${id}`)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => getData());

  }

  //Edit the quotes in database on click
  function editOnClickHandler(id) {

    if (isEdit) {
      axiosInstance
        .patch(`/crudapp/${id}`, {
          name: userName,
          quote: quoteRef.current.textContent.substring(1, quoteRef.current.textContent.length - 2),
        })
        .then((res) => {
          // console.log(res?.data);
        })
        .catch((err) => console.log(err))
        .finally(() => getData());
    }
    else useNameRef.current.focus();
    setIsEdit(!isEdit);
  }

  return (
    <>
      <div className="card">
        <p className="quote-icon">
          <FaQuoteLeft />
        </p>
        <div className="info">
          <p className="quote" role={"textbox"} contentEditable={isEdit} ref={quoteRef} suppressContentEditableWarning={true} >{`"${props.quote}"`} </p>
          <p className="user-name" ref={useNameRef}>{!isEdit ? `- ${userName}` : <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />}</p>
        </div>
        <div className="btns">
          <p onClick={() => deleteData(props.id)}>
            <MdDeleteForever />
          </p>
          <p
            onClick={() => editOnClickHandler(props.id)}
          >
            {isEdit ? <MdCheck /> : <MdModeEditOutline />}
          </p>
        </div>
      </div>
    </>
  );
}
