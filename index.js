const express = require('express')
const mongoose = require('mongoose')
const app = express()



app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())



const gameRoutes = require('./routes/gameRoutes')

app.use ('/game', gameRoutes)


app.get('/', (req, res) => {

    res.json({message: 'Oi Express!'})
})

const DB_USER = 'gabriel'
const DB_PASSWORD = encodeURIComponent('XA0YBqYbQlNawnAC')

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.xxfhm.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))
