const express = require('express')
const home_router = express.Router()

home_router.get('/', (req, res) => {
    res.render('home')
})

module.exports = home_router