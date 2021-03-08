const router = require('express').Router()
const morgan = require('morgan')
require('dotenv').config()
const { default: axios } = require('axios')
const db = require('../models')
const { get } = require('./authController')
const cryptoJs = require('crypto-js')
const Documenu = require('documenu')
const API_KEY = process.env.API_KEY
Documenu.configure(API_KEY)

router.get('/index' , (req, res) => {
    res.render('favorites/index')
}) 
router.post('/', async (req, res) => {
    try{
        const decryptedId = cryptoJs.AES.decrypt(req.cookies.userId, 'super secret string')
        const decryptedIdString = decryptedId.toString(cryptoJs.enc.Utf8)
        
        const user = await models.user.findByPk(decryptedIdString)
        
        console.log(user.id)
        const restaurant = await models.favorite.create({
            name: req.body.name,
            userId: user.id,
        })
        res.redirect('/favorite/:id/index')
    }catch(err){
        console.log(err)
    }
})

module.exports = router;