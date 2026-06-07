import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BookList from './pages/BookList';
import AuthorList from './pages/AuthorList';
import AddBook from './pages/AddBook';
import AddAuthor from './pages/AddAuthor';
import EditBook from './pages/EditBook';
import EditAuthor from './pages/EditAuthor';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Βιβλία</Link>
        {" | "}
        <Link to="/authors">Συγγραφείς</Link>
        {" | "}
        <Link to="/add-book">+ Προσθήκη Βιβλίου</Link>
        {" | "}
        <Link to="/add-author">+ Προσθήκη Συγγραφέα</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/add-author" element={<AddAuthor />} />
        <Route path="/edit-book/:isbn" element={<EditBook />} />
        <Route path="/edit-author/:id" element={<EditAuthor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;