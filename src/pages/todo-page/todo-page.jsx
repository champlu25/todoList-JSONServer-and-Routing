import styles from "./todo-page.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteTodo, editTodo } from "../../handlers";

export const TodoPage = ({ refreshTodosFlag, toggleRefreshTodosFlag }) => {
  const [todo, setTodo] = useState({});
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3005/todos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Задача не найдена");
        }
        return response.json();
      })
      .then((loadedData) => {
        setTodo(loadedData);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id, refreshTodosFlag]);

  useEffect(() => {
    if (error) {
      navigate("/404", { replace: true });
    }
  }, [error, navigate]);

  return (
    <>
      <div className={styles.todoContainer}>
        <div className={styles.todoButtons}>
          <button
            className={styles.backToPreviousPageBtn}
            onClick={() => {
              navigate("/");
            }}
          >
            Назад
          </button>
          <button
            className={styles.deleteTodoBtn}
            onClick={() => {
              deleteTodo(id, toggleRefreshTodosFlag);
              navigate("/");
            }}
          >
            Удалить
          </button>
        </div>
        <span className={styles.todoContent}>{todo.content} </span>
        <button
          className={styles.editBtn}
          onClick={() => {
            editTodo(id, todo.content, toggleRefreshTodosFlag);
          }}
        >
          Редактировать
        </button>
      </div>
    </>
  );
};
