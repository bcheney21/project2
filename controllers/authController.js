const router = require('express').Router()
const models = require('../models')
const dotenv = require('dotenv')
const cryptoJs = require('crypto-js')
const { mode } = require('crypto-js')

router.get('/new' , async (req, res) => {
    res.render('auth/new')
})

router.post('/', async (req, res) => {
    try {
        const user = await models.user.create({
            username: req.body.username,
            password: req.body.password,
            zipcode: req.body.zipcode
        })
        const encryptedId = cryptoJs.AES.encrypt(user.id.toString(), 'secret')
        const stringEncryptedId = encryptedId.toString()
        res.cookie('userId', stringEncryptedId)
        res.redirect('/')
    } catch(error) {
        console.log(error)
    }

})

router.get('/login', async (req, res) => {
    res.render('auth/login')
})

router.post('/login', async (req, res) => {
    const user = await models.user.findOne({
        where: {
        username: req.body.username
        }
    })
    if(user.password === req.body.password){
        const encryptedId = cryptoJs.AES.encrypt(user.id.toString(), 'secret')
        const stringEncryptedId = encryptedId.toString()
        res.cookie('userId', stringEncryptedId)
        res.redirect('/')
    } else{
        res.render('auth/login')
    }
})

router.get('/logout', async (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})
module.exports = router
