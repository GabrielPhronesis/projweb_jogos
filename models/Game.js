const mongoose = require('mongoose')

const Game = mongoose.model('Game', {
    nome: String,
    descricao: String,
    ano: String,
    categoria: String,
    url: String,
    //salary: Number,
    //approved: Boolean,
})

module.exports = Game