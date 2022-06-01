const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require("path")

const PORT = process.env.PORT || 3000

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())



const gameRoutes = require('./routes/gameRoutes')

app.use ('/game', gameRoutes)

app.use((express.static(path.join(__dirname, "public"))))


const DB_USER = 'gabriel'
const DB_PASSWORD = encodeURIComponent('XA0YBqYbQlNawnAC')
//mongodb+srv://gabriel:XA0YBqYbQlNawnAC@apicluster.xxfhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.xxfhm.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(PORT)
    })
    .catch((err) => console.log(err))
