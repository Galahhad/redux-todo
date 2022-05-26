import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

const Todo = ({setTextNone, setState}) => {
  const todoArray = useSelector((state) => state.todoArray);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch({ type: "delete_todo", payload: id });
    setTextNone(false);
    setState(false);
  };

  const handleCheck = (id) => {
    dispatch({ type: "check_todo", payload: id });
    setTextNone(false);
    setState(false);
  };

  return (
    <div className="todos">
      {todoArray.map((item, index) => {
        return (
          <div className={`todo ${item.checked ? "check" : ""}`} key={index}>
            <button onClick={() => handleCheck(index)}>
              {!item.checked ? (
                <BsCheck className="checker" />
              ) : (
                <BsCheckAll className="checker" />
              )}
            </button>
            <p>{item.text}</p>
            {!item.checked && (
              <button onClick={() => handleDelete(index)}>
                <FaTrashAlt className="trash" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
