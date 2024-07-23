const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    number: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: (v) => /^\d{2,3}-\d{6,}$/.test(v),
            message: props => `${props.value} is not a valid phone number`
        },
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person;