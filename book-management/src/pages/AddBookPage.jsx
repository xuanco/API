import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books";

function AddBookPage() {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!title.trim() || !quantity) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newBook = { title, quantity: Number(quantity) };
    await axios.post(API_URL, newBook);
    alert("Thêm sách thành công!");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Add a new Book</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tiêu đề sách"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          placeholder="Nhập số lượng"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button className="btn btn-success" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddBookPage;
