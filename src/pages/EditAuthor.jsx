import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

function EditAuthor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [nationality, setNationality] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [books, setBooks] = useState([]);
    const [selectedIsbn, setSelectedIsbn] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        api.get(`/authors/${id}`)
            .then(response => {
                const author = response.data;
                setName(author.name);
                setNationality(author.nationality);
                setBirthdate(author.birthdate);
                setSelectedIsbn(author.bookIsbn[0] || "");
            })
            .catch(error => console.log("Σφάλμα:", error));

        api.get("/books")
            .then(response => setBooks(response.data))
            .catch(error => console.log("Σφάλμα:", error));
    }, []);

    function handleSubmit() {
        const dto = {
            name: name,
            nationality: nationality,
            birthdate: birthdate,
            bookIsbn: selectedIsbn === "" ? [] : [selectedIsbn]
        };

        api.put(`/authors/${id}`, dto)
            .then(() => navigate("/authors"))
            .catch(error => setMessage("Σφάλμα: " + error.message));
    }

    return (
        <div>
            <h1>Επεξεργασία Συγγραφέα</h1>

            <div>
                <label>Όνομα:</label>
                <input value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div>
                <label>Εθνικότητα:</label>
                <input value={nationality} onChange={e => setNationality(e.target.value)} />
            </div>

            <div>
                <label>Ημερομηνία Γέννησης:</label>
                <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
            </div>

            <div>
                <label>Βιβλίο:</label>
                <select value={selectedIsbn} onChange={e => setSelectedIsbn(e.target.value)}>
                    <option value="">-- Χωρίς βιβλίο --</option>
                    {books.map(book => (
                        <option key={book.isbn} value={book.isbn}>
                            {book.title}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleSubmit}>Αποθήκευση</button>

            {message && <p>{message}</p>}

            <a href="/authors">← Πίσω στη λίστα συγγραφέων</a>
        </div>
    );
}

export default EditAuthor;