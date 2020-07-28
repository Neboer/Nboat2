const express = require('express')
const main_api_router = express.Router()
const sub_routers = [
    require('./create_blog'),
    require('./delete_blog'),
    require('./update_blog')
]

main_api_router.use(sub_routers)

main_api_router.use((req, res, next) => {
    res.status(404).send("no such api")
    next()
})

main_api_router.use((err, req, res, next) => {
    res.status(400).send(err.error)
})

module.exports = main_api_router