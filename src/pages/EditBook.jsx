import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

function EditBook() {
    const { isbn } = useParams(); // παίρνει το ISBN από το URL
    const navigate = useNavigate(); // για πλοήγηση μετά την αποθήκευση

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [year, setYear] = useState("");
    const [authors, setAuthors] = useState([]);
    const [selectedAuthorId, setSelectedAuthorId] = useState("");
    const [message, setMessage] = useState("");

    // Φόρτωσε τα στοιχεία του βιβλίου και τους συγγραφείς
    useEffect(() => {
        api.get(`/books/${isbn}`)
            .then(response => {
                const book = response.data;
                setTitle(book.title);
                setCategory(book.category);
                setYear(book.year);
                setSelectedAuthorId(book.authorsIds[0] || "");
            })
            .catch(error => console.log("Σφάλμα:", error));

        api.get("/authors")
            .then(response => setAuthors(response.data))
            .catch(error => console.log("Σφάλμα:", error));
    }, []);

    function handleSubmit() {
        const dto = {
            isbn: isbn,
            title: title,
            category: category,
            year: parseInt(year),
            authorsIds: selectedAuthorId === "" ? [] : [parseInt(selectedAuthorId)]
        };

        api.put(`/books/${isbn}`, dto)
            .then(() => navigate("/")) // πήγαινε στη λίστα μετά την αποθήκευση
            .catch(error => setMessage("Σφάλμα: " + error.message));
    }

    return (
        <div>
            <h1>Επεξεργασία Βιβλίου</h1>

            <div>
                <label>ISBN:</label>
                <input value={isbn} disabled /> {/* δεν αλλάζει το ISBN */}
            </div>

            <div>
                <label>Τίτλος:</label>
                <input value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div>
                <label>Κατηγορία:</label>
                <input value={category} onChange={e => setCategory(e.target.value)} />
            </div>

            <div>
                <label>Έτος:</label>
                <input value={year} onChange={e => setYear(e.target.value)} />
            </div>

            <div>
                <label>Συγγραφέας:</label>
                <select value={selectedAuthorId} onChange={e => setSelectedAuthorId(e.target.value)}>
                    <option value="">-- Χωρίς συγγραφέα --</option>
                    {authors.map(author => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleSubmit}>Αποθήκευση</button>

            {message && <p>{message}</p>}

            <a href="/">← Πίσω στη λίστα</a>
        </div>
    );
}

export default EditBook;