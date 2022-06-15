const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require("path")
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 3000




const gameRoutes = require('./routes/gameRoutes')

const gamesRoutes = require('./routes/gamesRoutes')




// Configurações

//Body Parser
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())
// View engine
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
// Public
app.use(express.static(__dirname + '/public'));



app.use ('/api', gameRoutes)
app.use ('/', gamesRoutes)








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
