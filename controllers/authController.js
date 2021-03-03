const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const AES = require('crypto-js/aes')

router.get('/login', (req, res) => {
    console.log(hi)
    res.render('auth/login', { errors: null })
})

module.exports = router