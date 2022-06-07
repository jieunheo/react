import React, { useState } from "react";

import Todo from '../models/todo';

type TodoContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodoContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {}
});

const TodosContextProvider: React.FC = (props) => {
  // 저장될 배열이 Todo 형식인 것을 명시적으로 제시
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    // .concat(): 새로운 배열 생성
    setTodos((prevTodos) => prevTodos.concat(newTodo));
  };

  const removeTodoHandler = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter(item => item.id !== id));
  };

  const contextValue: TodoContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  )
};

export default TodosContextProvider;