const router = require('express').Router()
const { default: axios } = require('axios')
const db = require('../models')
const Documenu = require('documenu')

// router.get('/', async (req, res) => {
//     try {
//         const favorites = await db.favorite.findAll({ raw: true })
//         console.log(favorites)

//         res.render('favorites/index', { favorites: favorites.data })
//     } catch (err) {
//         console.log(err)
//         res.redirect('/')
//     }
// })

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const [newFav, created] = await Documenu.Restaurants.searchFields(req.body.restaurant)
        // console.log(created);
        res.locals.favorite.addFav(newFav);
        res.redirect(`/favorites`)
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;