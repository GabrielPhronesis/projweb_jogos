const router = require('express').Router()

const { route } = require('express/lib/application')
const { append } = require('express/lib/response')
const Game = require('../models/Game')

const Categoria = require('../models/Categoria')

const Comentario = require('../models/Comentario')

const Usuario = require('../models/Usuario')

const secret = "abc123"

//CREATE GAMES
router.post('/', async (req, res) => {

    const {nome, descricao, ano, categoria, url} = req.body

    if(!nome){
        res.status(422).json({erro: 'O nome é obrigatorio'})
        return
    }

    const game = {
        nome,
        descricao,
        ano,
        categoria,
        url
    }

    try{
        await Game.create(game)

        await res.redirect('/cadastrojogo')
        
    } catch(error) {
        res.status(500).json({error: error})
    }

})

// CREATE CATEGORIAS
router.post('/categoria', async(req, res) => {
    const {nome, url} = req.body

    const categoria = {
        nome,
        url
    }
    try{
        await Categoria.create(categoria)
        res.redirect('/cadastrocategoria')
        

    } catch(error) {
        res.status(500).json({error: error})
    }
})



router.post('/comentario', async(req, res) => {
    const {nota, comentario, idJogo} = req.body

    const avaliacao = {
        nota, 
        comentario, 
        idJogo
    }
    try{
        await Comentario.create(avaliacao)
        res.redirect(`/${idJogo}`)
        

    } catch(error) {
        res.status(500).json({error: error})
    }
})

router.post('/cadastro', async(req, res) => {
    const usuarioexistente = await Usuario.findOne({email: req.body.email})

    const {nome, email, senha} = req.body

    const usuario = {
        nome,
        email,
        senha
    }

    

    try{
        if(usuarioexistente){
            res.redirect("/")
        } else {
            await Usuario.create(usuario)
            res.redirect("/")
        }


    } catch(error) {
        res.status(500).json({error: error})
    }

    

})

router.post('/login', async(req, res) => {
    

    const {email, senha} = req.body



    const usuarioexistente = await Usuario.findOne({email: email})

    if(!usuarioexistente){
        res.redirect("/")
    }
    
    if(usuarioexistente.senha != senha){
        res.redirect("/")
    } 

    try {
        res.redirect("/destaque")
    } catch(error){
        res.redirect("/")
        return
    }

})


router.get('/', async (req, res) => {
    try {

        const games = await Game.find()

        res.status(200).json(games)
        
    } catch (error) {
        res.status(500).json({error: error})   
    }
})

router.get('/categoria', async(req, res) => {
    try {
        const categorias = await Categoria.find()
        
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/comentario', async(req, res) => {
    try {
        const comentarios = await Comentario.find()
        
        res.status(200).json(comentarios)
    } catch (error) {
        res.status(500).json({error: error})
    } 
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        
        const game = await Game.findOne({_id: id})

        if(!game) {
            res.status(422).json({message: 'O jogo nao foi encontrado'})
            return
        }

        res.status(200).json(game)

    } catch (error) {
        res.status(500).json({error: error})   
    }
})

//UPDATE
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {nome, descricao, ano, categoria, url} = req.body

    const game = {
        nome,
        descricao,
        ano,
        categoria,
        url
    }

    try{

        const updatedGame = await Game.updateOne({_id: id}, game)

        if(updatedGame.matchedCount === 0){
            res.status(422).json({message: 'O jogo nao foi encontrado'})
            return
        }

        res.status(200).json(game)

    } catch(error) {
        res.status(500).json({error: error})  
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    const game = await Game.findOne({_id: id})

    if(!game) {
        res.status(422).json({message: 'O jogo nao foi encontrado'})
        return
    }

    try {
        await Game.deleteOne({_id: id})

        res.status(200).json({message: "O jogo foi removido com sucesso"})
    } catch (error) {
        res.status(500).json({error: error})  
    }
})

module.exports = router