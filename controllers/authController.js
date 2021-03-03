const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const AES = require('crypto-js/aes')

router.get('/login', (req, res) => {
    res.render('auth/login', { errors: null })
})
// Logout the user by removing their cookie
router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

// Display signup page
router.get('/new', (req, res) => {
    res.render('auth/new', { errors: null })
})

// Create user
router.post('/', async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)

    try {
        if(!req.body.username || !req.body.password) {
            res.render('auth/new', { errors: 'Invalid input'})
            return;
        }


        const user = await db.user.create({
            username: req.body.username,
            password: hashedPassword
        })

        console.log(res.locals.user)

        const encryptedId = AES.encrypt(user.id.toString(), process.env.COOKIE_SECRET).toString()
        res.cookie('userId', encryptedId)
        res.redirect('/')
    } catch (err) {
        console.log( err)
        res.render('auth/new', { errors: 'Error creating user. Please try again'})
    }
})

// Logging in
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
            res.render("auth/login", { errors: "Invalid input" })
        }

    } catch (err) {
        console.log(err)
        res.render('auth/login', { errors: "Invalid input" })
    }
})

module.exports = router