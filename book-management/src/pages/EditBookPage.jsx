import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books";

function EditBookPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then((res) => {
      setTitle(res.data.title);
      setQuantity(res.data.quantity);
    });
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() || !quantity) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    await axios.put(`${API_URL}/${id}`, { title, quantity: Number(quantity) });
    alert("Cập nhật sách thành công!");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Edit</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button className="btn btn-success" onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditBookPage;
