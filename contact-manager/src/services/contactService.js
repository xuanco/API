import axios from "axios";

const API_URL = "http://localhost:5000/contacts";

// Lấy danh sách danh bạ
export const getContacts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Thêm danh bạ mới
export const addContact = async (contact) => {
  const response = await axios.post(API_URL, contact);
  return response.data;
};

// Cập nhật danh bạ
export const updateContact = async (id, contact) => {
  const response = await axios.put(`${API_URL}/${id}`, contact);
  return response.data;
};

// Xóa danh bạ
export const deleteContact = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
