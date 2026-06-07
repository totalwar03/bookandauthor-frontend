import { useState } from 'react';
import { api } from '../api';

function AddAuthor() {
    const [name, setName] = useState("");
    const [nationality, setNationality] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [bookIsbns, setBookIsbns] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit() {
        const dto = {
            name: name,
            nationality: nationality,
            birthdate: birthdate,
            bookIsbn: bookIsbns === "" ? [] : bookIsbns.split(",").map(isbn => isbn.trim())
        };
        console.log("Στέλνω:", dto);
        api.post("/authors", dto)
            .then(() => {
                setMessage("Ο συγγραφέας προστέθηκε επιτυχώς!");
                setName("");
                setNationality("");
                setBirthdate("");
                setBookIsbns("");
            })
            .catch(error => setMessage("Σφάλμα: " + error.message));
    }

    return (
        <div>
            <h1>Προσθήκη Συγγραφέα</h1>

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
                <label>ISBNs Βιβλίων (χωρισμένα με κόμμα π.χ. 978-123,978-456):</label>
                <input value={bookIsbns} onChange={e => setBookIsbns(e.target.value)} />
            </div>

            <button onClick={handleSubmit}>Προσθήκη</button>

            {message && <p>{message}</p>}

            <a href="/authors">← Πίσω στη λίστα συγγραφέων</a>
        </div>
    );
}

export default AddAuthor;