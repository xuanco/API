import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts";
const UPLOAD_URL = "https://v2.convertapi.com/upload";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        setContact(response.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(UPLOAD_URL, formData);
        setContact({ ...contact, image: response.data.url });
      } catch (error) {
        console.error("Upload ảnh thất bại", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.phone) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/${id}`, contact);
      alert("Cập nhật danh bạ thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi cập nhật dữ liệu:", error);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Edit</h2>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="text-center mb-3">
          <img
            src={contact.image || "https://via.placeholder.com/100"}
            alt="Avatar"
            className="rounded-circle"
            width="100"
            height="100"
          />
          <br />
          <label className="btn btn-primary mt-2" style={{ fontSize: "14px" }}>
            Change Image
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100" style={{ backgroundColor: "#28a745", border: "none" }}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditContact;