const mongoose = require('mongoose')

const Comentario = mongoose.model('Comentario', {
    nota: Number,
    comentario: String,
    idJogo: String,
    nome: String,
})

module.exports = Comentario