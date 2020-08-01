const express = require('express')
const database = require('../../database')
const main_router = express.Router()

let not_found_error = new Error()
not_found_error.name = "PageNotFound"
not_found_error.code = 404
not_found_error.message = "There isn't such a page on the server."

main_router.use((req, res, next) => {
    req.not_found_error = not_found_error
    next()
})