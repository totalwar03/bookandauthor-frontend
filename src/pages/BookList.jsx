import { useState, useEffect} from 'react';
import {api} from '../api';
import { Link } from 'react-router-dom';

function BookList(){

    const [books, setBooks] = useState([]);

    useEffect( () => { loadBooks(); }, []);

    function loadBooks(){

        api.get(`/books`)
        .then(response => setBooks(response.data))
        .catch(error => console.log("Error: ", error));
    }
    function deleteBook(isbn){

        api.delete(`/books/${isbn}`)
        .then( () => loadBooks())
        .catch(error => console.log("Error: ", error));
    }

    return (
    <div>
      <h1>Βιβλία</h1>
      <a href="/add-book">+ Προσθήκη βιβλίου</a>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Τίτλος</th>
            <th>Κατηγορία</th>
            <th>Έτος</th>
            <th>Ενέργειες</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.isbn}>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.category}</td>
              <td>{book.year}</td>
              <td>
                <Link to={`/edit-book/${book.isbn}`}>Επεξεργασία</Link>
                {" | "}
                 <button onClick={() => deleteBook(book.isbn)}>Διαγραφή</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;



