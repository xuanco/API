import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../services/contactService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh bạ này?")) {
      await deleteContact(id);
      alert("Xóa thành công!");
      loadContacts();
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Contacts</h1>
      <button className="btn btn-success mb-3" onClick={() => navigate("/add")}>
        Add Contact
      </button>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.image || "https://via.placeholder.com/50"}
                  alt="Avatar"
                  width="50"
                  height="50"
                  className="rounded-circle me-2"
                />
                {contact.name}
              </td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate(`/edit/${contact.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
