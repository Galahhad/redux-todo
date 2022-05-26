import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from './Todo';

const Form = () => {
  const dispatch = useDispatch();
  const array = useSelector((state) => state.todoArray);

  const [text, setText] = useState("");
  const [state, setState] = useState(false);
  const [textNone, setTextNone] = useState(false);

  const handleText = (e) => {
    setText(e.target.value);
    setState(false);
    setTextNone(false);
  };

  const noneText = text.trim().length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    if (array.some((item) => item.text.toUpperCase() === text.toUpperCase())) {
      setText("");
      setState(true);
    }else if (noneText) {
        setText('');
        setTextNone(true);
    } else {
      dispatch({ type: "add_todo", payload: text });
      setState(false);
    }
  };

  const handleBlur = () => {
    if (noneText) {
      setTextNone(true);
    } else {
      setTextNone(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input value={text} onChange={handleText} onBlur={handleBlur} />
        <button disabled={noneText} type="submit">
          Add
        </button>
      </form>
      {state && <p style={{ color: "red" }}>Такое дело уже добавлено</p>}
      {textNone && (
        <p style={{ color: "red" }}>Поле ввода не может быть пустым</p>
      )}
      <Todo setTextNone={setTextNone} setState={setState}/>
    </>
  );
};

export default Form;
