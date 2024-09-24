import styles from "./main-page.module.css";
import { useState, useEffect } from "react";
import { alphabedSort } from "../../utils";
import { addTodo } from "../../handlers";
import { Link } from "react-router-dom";

export const MainPage = ({ refreshTodosFlag, toggleRefreshTodosFlag }) => {
  const [searchTodoValue, setSearchTodoValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/todos")
      .then((response) => response.json())
      .then((loadedData) => {
        setTodos(loadedData);
      });
  }, [refreshTodosFlag]);

  const setTodoValue = (event) => {
    setSearchTodoValue(event.target.value);
  };

  return (
    <>
      <div className={styles.todosContainer}>
        <div className={styles.headerContent}>
          <span className={styles.title}>Todo List</span>
          <button
            className={styles.alphabedBtn}
            onClick={() => alphabedSort(todos, setTodos)}
          >
            A⬇Z
          </button>
          <button
            className={styles.btnAdd}
            onClick={() => addTodo(toggleRefreshTodosFlag)}
          >
            🞢
          </button>
          <span className={styles.findTodoLabel}>Поиск </span>
          <input
            className={styles.findTodoInput}
            value={searchTodoValue}
            onChange={setTodoValue}
          />
        </div>
        {todos
          .filter(({ content }) =>
            content.toLowerCase().includes(searchTodoValue.toLowerCase())
          )
          .map(({ id, content }) => (
            <li className={styles.todosWrapper} key={id}>
              <input className={styles.checkboxTodo} type="checkbox" />
              <Link to={`/task/${id}`} className={styles.todoContent}>
                {content}
              </Link>
            </li>
          ))}
      </div>
    </>
  );
};
