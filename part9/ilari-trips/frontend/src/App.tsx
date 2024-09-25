import { useEffect, useState } from "react"
import axios from "axios"
import { DiaryEntry } from "./types/diary"

function App() {

  const [error, setError] = useState<string | null>(null)
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [newEntry, setNewEntry] = useState({
    date: '',
    weather: "",
    visibility: "",
    comment: '',
  })

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, date: event.target.value })
  }

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, weather: event.target.value })
  }

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, visibility: event.target.value })
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, comment: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newEntry).then(response => {
      setEntries(entries => [...entries, response.data])
      setNewEntry({ date: '', weather: '', visibility: '', comment: '' })
    }).catch(error => {
      console.error(error)
      setError(error.response.data)
    })
  }

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setEntries(response.data)
    })
  }, [])

  return (
    <>

      <h1>Add new entry</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" value={newEntry.date} onChange={handleDateChange} />
        </div>
        <div>
          <label htmlFor="weather">Weather: </label>
          <div>
            <label htmlFor="sunny">Sunny</label>
            <input type="radio" value="sunny" id="sunny" name="weather" onChange={handleWeatherChange} />
            <label htmlFor="rainy">Rainy</label>
            <input type="radio" value="rainy" id="rainy" name="weather" onChange={handleWeatherChange} />
            <label htmlFor="cloudy">Cloudy</label>
            <input type="radio" value="cloudy" id="cloudy" name="weather" onChange={handleWeatherChange} />
            <label htmlFor="stormy">Stormy</label>
            <input type="radio" value="stormy" id="stormy" name="weather" onChange={handleWeatherChange} />
            <label htmlFor="windy">Windy</label>
            <input type="radio" value="windy" id="windy" name="weather" onChange={handleWeatherChange} />
          </div>
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          <div>
            <label htmlFor="great">Great</label>
            <input type="radio" value="great" id="great" name="visibility" onChange={handleVisibilityChange} />
            <label htmlFor="good">Good</label>
            <input type="radio" value="good" id="good" name="visibility" onChange={handleVisibilityChange} />
            <label htmlFor="ok">Ok</label>
            <input type="radio" value="ok" id="ok" name="visibility" onChange={handleVisibilityChange} />
            <label htmlFor="poor">Poor</label>
            <input type="radio" value="poor" id="poor" name="visibility" onChange={handleVisibilityChange} />
          </div>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input type="text" value={newEntry.comment} onChange={handleCommentChange} />
        </div>
        <button type="submit">Add entry</button>
      </form>

      <h1>Diary entries</h1>

      {entries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
        </div>
      ))}
    </>
  )
}

export default App
