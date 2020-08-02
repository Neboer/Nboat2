const express = require('express')
const database = require('../../database')
const main_router = express.Router()
const home_newest_router = require('./home_newest')
const blog_sort_router = require('./blog_sort')
const editor_router = require('./editor')

let not_found_error = new Error()
not_found_error.name = "PageNotFound"
not_found_error.code = 404
not_found_error.message = "There isn't such a page on the server."

main_router.use((req, res, next) => {
    req.not_found_error = not_found_error
    next()
})

main_router.use([home_newest_router, blog_sort_router, editor_router])

main_router.use((err, req, res, next) => {
    console.error(err)
    res.status(404).render("not_found.pug")
    // next()
})

module.exports = main_router