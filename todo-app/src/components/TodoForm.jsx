import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/todos";

const TodoForm = ({ onAddTodo }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return alert("Vui lòng nhập task!");

    try {
      const response = await axios.post(API_URL, { title: task, completed: false });
      alert(`Thêm thành công! Status: ${response.status}`);
      onAddTodo(response.data);
      setTask("");
    } catch (error) {
      console.error("Lỗi khi thêm todo:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Nhập todo..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TodoForm;
