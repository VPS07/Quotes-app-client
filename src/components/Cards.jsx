import axiosInstance from "../config";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { createContext } from "react";
import Addquote from "./Addquote";
import Card from "./Card";

export const CardContext = createContext(null);

export default function Cards() {
  const [editingId, setEditingId] = useState(false);
  const [crudData, setCrudData] = useState([]);
  const [editProp, setEditProp] = useState({
    id: "",
    isEdit: false,
  });
  const inputRef = useRef();
  const textareaRef = useRef();

  function getData() {
    axiosInstance.get("/crudapp").then((res) => {
      setCrudData(res.data);
      // console.log(res.data);
    });
  }

  // reset the input box after click
  function resetInput() {
    inputRef.current.value = "";
    textareaRef.current.value = "";
  }

  useEffect(() => {
    getData();
  }, [crudData]);

  // add on button click
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
      });
    getData();
    resetInput();
  }

  // delete the data from api
  function deleteData(id) {
    axiosInstance
      .delete(`/crudapp/${id}`)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
    getData();
  }

  function editData(data) {
    inputRef.current.value = data.name;
    textareaRef.current.value = data.quote;
    setEditProp({
      id: data._id,
      isEdit: true,
    });
  }

  function editHandleClick() {
    axiosInstance
      .patch(`/crudapp/${editProp.id}`, {
        name: inputRef.current.value,
        quote: textareaRef.current.value,
      })
      .then((res) => {
        // console.log(res?.data);
      })
      .catch((err) => console.log(err));
    setEditProp({
      id: "",
      isEdit: false,
    });
    setEditingId("");
    resetInput();
  }

  return (
    <CardContext.Provider
      value={{
        editingId,
        setEditingId,
        inputRef,
        textareaRef,
        editProp,
        editHandleClick,
        handleClick,
      }}
    >
      <Addquote />

      <div className="container">
        {crudData.map((data) => (
          <Card
            key={data._id}
            name={data.name}
            quote={data.quote}
            deleteData={() => deleteData(data._id)}
            editData={() => {
              editData(data);
            }}
            id={data._id}
          />
        ))}
      </div>
    </CardContext.Provider>
  );
}
