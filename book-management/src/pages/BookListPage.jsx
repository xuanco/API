import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3001/books";

function BookListPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setBooks(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      await axios.delete(`${API_URL}/${id}`);
      alert("Xóa thành công!");
      setBooks(books.filter(book => book.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Library</h1>
      <Link to="/add">
        <button className="btn btn-success mb-3">Add a new Book</button>
      </Link>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.quantity}</td>
              <td>
                <Link to={`/edit/${book.id}`}>
                  <button className="btn btn-primary me-2">Edit</button>
                </Link>
                <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookListPage;
