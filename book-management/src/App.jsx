import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookListPage from "./pages/BookListPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/add" element={<AddBookPage />} />
        <Route path="/edit/:id" element={<EditBookPage />} />
      </Routes>
    </Router>
  );
}

export default App;
