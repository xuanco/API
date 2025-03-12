import { useEffect } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

const TodoList = ({ todos, setTodos }) => {
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchTodos();
  }, [setTodos]); // Thêm `setTodos` vào dependency array

  return (
    <div>
      <h2>Danh sách Todo</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
