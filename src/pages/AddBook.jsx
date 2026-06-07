import {useState} from 'react'
import {api} from '../api'

function AddBook(){

    const [isbn, setIsbn] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [year, setYear] = useState(""); 
    const [authorsIds, setAuthorsIds] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit() {

        const dto = {
            isbn: isbn,
            title: title,
            category: category,
            year: parseInt(year),
            authorsIds: authorsIds === "" ? [] : authorsIds.split(",").map(id => parseInt(id.trim()))
        };
        console.log("Στέλνω:", dto); 
        api.post("/books", dto)
      .then(() => {
        setMessage("Το βιβλίο προστέθηκε επιτυχώς!");
        // καθάρισε τη φόρμα
        setIsbn("");
        setTitle("");
        setCategory("");
        setYear("");
        setAuthorsIds("");
      })
      .catch(error => setMessage("Σφάλμα: " + error.message));
    }
      return (
    <div>
      <h1>Προσθήκη Βιβλίου</h1>

      <div>
        <label>ISBN:</label>
        <input value={isbn} onChange={e => setIsbn(e.target.value)} />
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
        <label>IDs Συγγραφέων (χωρισμένα με κόμμα π.χ. 1,2,3):</label>
        <input value={authorsIds} onChange={e => setAuthorsIds(e.target.value)} />
      </div>

      <button onClick={handleSubmit}>Προσθήκη</button>

      {message && <p>{message}</p>}

      <a href="/">← Πίσω στη λίστα</a>
    </div>
  );
}
export default AddBook;