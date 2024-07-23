require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./person')

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.use(cors())
app.use(express.static('dist'))
app.use(express.json());

morgan.token('data', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/info', (req, res, next) => {
    const date = new Date();

    Person.countDocuments().then(result => {
        res.send(`<p>Phonebook has info for ${result} people</p><p>${date}</p>`)
    }).catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(result => {
        res.json(result)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;

    Person.findById(id).then(result => {
        if (result) {
            res.send(result)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id).then(() => {
        res.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {

    const { name, number } = req.body;
    // if (db.persons.find(person => person.name === name)) {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person({ name, number })

    person.save().then(result => {
        res.json(result)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    const person = { name, number }

    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            res.json(result)
        }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})