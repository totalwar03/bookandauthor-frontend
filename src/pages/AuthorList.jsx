import {useState, useEffect} from 'react'
import { api } from '../api'
import { Link } from 'react-router-dom';

function AuthorList(){
    const [authors, setAuthors] = useState([]);

    useEffect( () => loadAuthors(), []);

    function loadAuthors(){
    api.get("/authors")
        .then(response => {
            console.log("Συγγραφείς:", response.data);
            setAuthors(response.data);
        })
        .catch(error => console.log("Error: ", error));
}

    function deleteAuthor(id){
      console.log("URL που στέλνω:", `/authors/${id}`);
    api.delete(`/authors/${id}`)
      .then((response) => {
        console.log("Διαγράφηκε!", response.status);
        loadAuthors();
      })
      .catch(error => {
        console.log("Σφάλμα status:", error.response?.status);
        console.log("Σφάλμα message:", error.message);
      });
    }

    return (
    <div>
      <h1>Συγγραφείς</h1>
      <a href="/add-author">+ Προσθήκη συγγραφέα</a>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Όνομα</th>
            <th>Εθνικότητα</th>
            <th>Ημ. Γέννησης</th>
            <th>Βιβλία</th>
            <th>Ενέργειες</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.name}</td>
              <td>{author.nationality}</td>
              <td>{author.birthdate}</td>
              <td>
                {author.bookIsbn.length > 0
                  ? author.bookIsbn.join(", ")
                  : "Κανένα βιβλίο"}
              </td>
              <td>
                <Link to={`/edit-author/${author.id}`}>Επεξεργασία</Link>
                {" | "} 
                <button onClick={() => deleteAuthor(author.id)}>Διαγραφή</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuthorList;