import React, {useState, useEffect} from 'react'
import notesService from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    notesService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
      .catch(error => alert('error', error))
  }, [])

  const notesToShow = showAll === true ?
    notes :
    notes.filter(note => note.important === true)

  const rows = () => notesToShow.map(note => 
    <Note 
      key={note.id} 
      note={note} 
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  )

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }
    notesService.create(noteObject)
      .then(created => {
        setNotes(notes.concat(created))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const noteUpdated = {
      ...note,
      important: !note.important
    }
    notesService.update(id, noteUpdated)
      .then(updated => {
        setNotes(notes.map(note => note.id !== id ? note : updated))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App;
