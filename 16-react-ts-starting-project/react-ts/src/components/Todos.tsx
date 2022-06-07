import React, { useContext } from "react";

import { TodosContext } from '../store/todos-context';
import TodoItem from "./TodoItem";
import classes from './Todos.module.css';

const Todos: React.FC = () => {
  const todoContext = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {todoContext.items.map(item => (
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveTodo={todoContext.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
}

export default Todos;