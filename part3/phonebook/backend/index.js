const express = require('express')
const db = require('./personsDB.json')
const morgan = require('morgan')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('dist'))
app.use(cors())
app.use(express.json());

morgan.token('data', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const generateId = () => {
    return Math.floor(Math.random() * 10000)
}

app.get('/api/persons', (req, res) => {
    res.send(db.persons)
})

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${db.persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = db.persons.find(person => person.id === id)
    if (person) {
        res.send(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    db.persons = db.persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {

    const { name, number } = req.body;

    if (!name) {
        return res.status(400).json({
            error: 'name is required'
        })
    }
    if (!number) {
        return res.status(400).json({
            error: 'number is required'
        })
    }
    if (db.persons.find(person => person.name === name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        name: name,
        number: number,
        id: generateId()
    }
    db.persons = db.persons.concat(person)
    res.json(person)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})