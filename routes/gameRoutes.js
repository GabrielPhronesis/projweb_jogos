const router = require('express').Router()

const { route } = require('express/lib/application')
const { append } = require('express/lib/response')
const Game = require('../models/Game')


//CREATE
router.post('/', async (req, res) => {

    const {nome, descricao, ano, categoria} = req.body

    if(!nome){
        res.status(422).json({erro: 'O nome é obrigatorio'})
        return
    }

    const game = {
        nome,
        descricao,
        ano,
        categoria
    }

    try{
        await Game.create(game)
        res.redirect('/game')
        //res.status(201).json({message: 'Jogo inserido'})

    } catch(error) {
        res.status(500).json({error: error})
    }

})


//READ
router.get('/criarjogo', async(req, res) => {
    try {
        res.sendFile(__dirname + "/index.html")
    } catch (error) {
        res.status(500).json({error: error})   
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

    const {nome, descricao, ano, categoria} = req.body

    const game = {
        nome,
        descricao,
        ano,
        categoria
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