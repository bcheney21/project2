// required modules and variables 
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
require('dotenv').config()
const db = require('./models')

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


// controllers
// routes

app.get('/', async (req, res) => {
    try {
        let response = await Documenu.Restaurants.getByZipCode('93103') 
        console.log(response)
        res.render('index', { restaurants: response.data })
    } catch (error) {
        console.log(error)
    }
})

// add a restaurant to favorites - POST /favorites 

// create new user - POST /users

// delete restaurant from favorites - DELETE /favorites:id

app.listen(PORT, () => {
    console.log(`Server is listening to port : ${PORT}`);
})