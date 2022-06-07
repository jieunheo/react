import React, { useRef } from "react";

const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const addTodoHandler = (event: React.FormEvent) => {
    // event 객체를 받기 위해 React.FormEvent 사용
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if(enteredText.trim().length === 0) {
      // throw new Error();
      return;
    }

    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={addTodoHandler}>
      <label htmlFor='text'>Todo Text</label>
      <input type='text' id='text' ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
}

export default NewTodo;