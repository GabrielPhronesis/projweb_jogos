const router = require('express').Router()

const { route } = require('express/lib/application')
const { append } = require('express/lib/response')
const Game = require('../models/Game')

const Categoria = require('../models/Categoria')


router.get('/destaque', function(req, res){
    res.render('index');
});

router.get('/categorias', function(req, res) {
    res.render('categorias')
})

router.get('/jogos', function(req, res) {
    res.render('jogos')
})

router.get('/', function(req, res) {
    res.render('cadastro')
})


router.get('/cadastrojogo', function(req, res){
    res.render('cadastrojogo');
});

router.get('/cadastrocategoria', function(req, res) {
    res.render('cadastrocategoria');
})

router.get('/:id', async(req, res) => {
    const id = req.params.id

    
    try {
        const game = await Game.findOne({_id: id})
        const categoria = await Categoria.findOne({_id: id})
        if(!game){
            if(!categoria){
                return
            }
            res.render('jogocategoria')
        }else {res.render('jogo')}
        



    } catch(error) {
        res.status(500).json({error: error})   
    }

    
})


module.exports = router