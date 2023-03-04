const express = require('express')
const Joi = require('joi')
const app = express()

app.use(express.json())

const books = [
    {id: 1, name: 'Book 1'},
    {id: 2, name: 'Book 2'},
    {id: 3, name: 'Book 3'},
]
app.get('/', (req, res) => {
    res.send('hello world!!!');
})

app.get('/books', (req, res) => {
    res.send(
        books
    )
})

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if(!book) res.status(404).send('book not found!')
    res.send(book)
})

app.post('/books', (req, res) => {
    //Handling post request
    const {error} = validateBook(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const book = {
        id: books.length + 1,
        name: req.body.name
    }
    books.push(book)
    res.send(book)
})

app.put('/books/:id', (req, res) =>{
    
    const book = books.find(b => b.id === parseInt(req.params.id))
    if(!book) res.status(404).send('book not found!')

    const {error} = validateBook(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    book.name = req.body.name
    res.send(book)
})

app.delete('/books/:id', (req, res)=>{
    const book = books.find(b => b.id === parseInt(req.params.id))
    if(!book) res.status(404).send('book not found!')

    const index = books.indexOf(book)
    books.splice(index, 1)

    res.send(book)
})

//reusing validation function to avoid repitition
function validateBook(book){
    const schema = {
        "name": Joi.string().min(3).required()
    }

    return Joi.validate(book, schema)

}
//environment varianles
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))

