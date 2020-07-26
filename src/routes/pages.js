const express = require('express')
const home_router = express.Router()

home_router.get('/', (req, res) => {
    res.render('home')
})

home_router.get('/write', (req, res) => {
    res.render('editor', {update: false})
})

module.exports = home_router