import express from 'express'
import mongoose from 'mongoose'

const categories = ['Food', 'Coding', 'Work', 'Others'] 
const entries = [
    {category: 'Food', content: 'Pizza'},
    {category: 'Coding', content: 'Express is cool!'},
    {category: 'Work', content: 'Another day at the office'},
]

mongoose.connect('mongodb+srv://thinguyen:jetmoon@cluster0.3lf84rb.mongodb.net/Journal')
    .then((m) => console.log(m.connection.readyState ? 'Connected' : 'Mongoose failed to connect'))

const app = express()
const port = 4001

app.use(express.json())
app.get('/', (req, res) => res.send({ info: 'Journal API redo' }))
app.get('/categories', (req, res) => res.send(categories))
app.get('/entries', (req, res) => res.send(entries))

app.get('/entries/:id', (req, res) => {
    const entry = entries[req.params.id]
    
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({ error: 'Entry not found' })
    }
})


app.post('/entries', (req, res) => {
    // 1. Create new entry object with values passed in from the request
    // validation and sanitization
    const { category, content } = req.body
    const newEntry = { category, content }
    // 2. Push the new entry to the entries array
    entries.push(newEntry)
    // 3. Send the new entry with 201 status
    res.status(201).send(newEntry)
})

app.listen(port, () => console.log('listening on http://127.0.0.1:' + port))