const mongoose = require('mongoose')

const Categoria = mongoose.model('Categoria', {
    nome: String,
    url: String,
})

module.exports = Categoria