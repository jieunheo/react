import React, { useRef, useContext } from "react";

import { TodosContext } from '../store/todos-context';
import classes from './NewTodo.module.css';

const NewTodo: React.FC = () => {
  const todoContext = useContext(TodosContext);

  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const addTodoHandler = (event: React.FormEvent) => {
    // event 객체를 받기 위해 React.FormEvent 사용
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if(enteredText.trim().length === 0) {
      // throw new Error();
      return;
    }

    todoContext.addTodo(enteredText);
  };

  return (
    <form onSubmit={addTodoHandler} className={classes.form}>
      <label htmlFor='text'>Todo Text</label>
      <input type='text' id='text' ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
}

export default NewTodo;