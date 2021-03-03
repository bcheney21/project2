const router = require('express').Router()
const morgan = require('morgan')
require('dotenv').config()
const { default: axios } = require('axios')
const db = require('../models')
const Documenu = require('documenu')
const API_KEY = process.env.API_KEY
Documenu.configure(API_KEY)

// Documenu.favorites.get(4072702673999819)
// .then(res=> {
//     console.log(res);
// });

router.get('/', async (req, res) => {
    try {
        const favorites = await db.favorite.findOne({ 
            where: {
                name: "the daily grind" 
            }
        })
        console.log(favorites.data)

        res.render('favorites/index', { favorites: favorites.data })
    } catch (error) {
        console.log(error)
        // res.redirect('/')
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const [newFav, created] = await Documenu.Restaurants.get(req.body.restaurantid)
        // console.log(created);
        res.locals.favorites.addFav(newFav);
        res.redirect(`/favorites`)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;