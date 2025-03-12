import axios from "axios";

const API_URL = "https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts";

// Lấy danh sách danh bạ
export const getContacts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy một danh bạ theo ID
export const getContactById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
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
// upload ảnh
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await axios.post("https://v2.convertapi.com/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  
    return response.data; // Dữ liệu trả về có thể chứa URL của ảnh đã upload
  };
