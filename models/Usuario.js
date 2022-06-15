const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario', {
    nome: String,
    email: String,
    eAdmin: {
        type: Number,
        default: 0
    },
    senha: String,
})
module.exports = Usuario