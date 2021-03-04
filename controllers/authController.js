const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const AES = require('crypto-js/aes')

router.get('/login', (req, res) => {
    res.render('auth/login', { errors: null })
})

// Display signup page
router.get('/new', (req, res) => {
    res.render('auth/new', { errors: null })
})

// Create user
router.post('/', async (req, res) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 12)

    try {
        if(!req.body.username || !req.body.password) {
            res.render('auth/new', { errors: 'Invalid input. Please try again.'})
            return;
        }


        const user = await db.user.create({
            username: req.body.username,
            password: hashPassword,
            zipcode: req.body.zipcode
        })

        console.log(res.locals.user)

        const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
        res.cookie('userId', encryptedId)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.render('auth/new')
    }
})

// Login user
router.post('/login', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: {
                username: req.body.username 
                }
        })

        if(user && bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
            res.cookie('userId', encryptedId)
            res.redirect('/')
        } else {
            res.render("auth/login", { errors: "Invalid login. Please try again." })
        }

    } catch (error) {
        console.log(error)
        res.render('auth/login', { errors: "Invalid login. Please try again." })
    }
})

module.exports = router