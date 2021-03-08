// required modules and variables 
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
require('dotenv').config()
const db = require('./models')
const cryptoJS = require('crypto-js')
const API_KEY = process.env.API_KEY
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = process.env.PORT || 3000
const Documenu = require('documenu')
Documenu.configure(API_KEY)

// middleware and config
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(require('cookie-parser')())


// controllers
app.use('/favorites', require('./controllers/favoritesController'))
app.use('/auth', require('./controllers/authController'))

// routes
  
app.get('/', async (req, res) => {
    try {
        let response = await Documenu.Restaurants.getByZipCode('93103') 
        res.render('index', { restaurants: response.data })
    } catch (error) {
        console.log(error)
    }
})
app.use(async (req, res, next) => {
    if(req.cookies.userId){

        const decryptedId = cryptoJs.AES.decrypt(req.cookies.userId, 'super secret string')
        const decryptedIdString = decryptedId.toString(cryptoJs.enc.Utf8)
        
        const user = await models.user.findByPk(decryptedIdString)
        
      res.locals.user = user
    }else{
        res.locals.user = null
    }
    
    next()
    
})
// add a restaurant to favorites - POST /favorites 

// create new user - POST /users

// delete restaurant from favorites - DELETE /favorites:id

app.listen(PORT, () => {
    console.log(`Server is listening to port : ${PORT}`);
})