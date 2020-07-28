const express = require('express')
const main_api_router = express.Router()
const sub_routers = [
    require('./create_blog'),
    require('./delete_blog'),
    require('./update_blog')
]

main_api_router.use(sub_routers)

module.exports = main_api_router