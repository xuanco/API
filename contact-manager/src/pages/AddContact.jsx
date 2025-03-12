import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addContact } from "../services/contactService";
import axios from "axios";

const AddContact = () => {
  const [contact, setContact] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Xử lý chọn ảnh
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("https://v2.convertapi.com/upload", formData);
        setContact({ ...contact, image: response.data.url });
      } catch (error) {
        console.error("Upload ảnh thất bại", error);
      }
    }
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.phone) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    await addContact(contact);
    alert("Thêm danh bạ thành công!");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add Contact</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        {/* Avatar */}
        <div className="text-center mb-3">
          <img
            src={contact.image || "https://via.placeholder.com/100"}
            alt="Avatar"
            className="rounded-circle"
            width="100"
            height="100"
          />
          <br />
          <label className="btn btn-primary mt-2">
            Add Image
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
        </div>

        {/* Name */}
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

        {/* Email */}
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

        {/* Phone */}
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

        {/* Nút Add */}
        <button type="submit" className="btn btn-success w-100">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
