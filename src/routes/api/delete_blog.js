const database = require('../../database')
const router = require('express').Router()
const checker = require('./cele_joi_middleware')
const schema = require('./input_schema')


router.delete('/:blog_hex_id', checker.check_params(schema.blog_id), (req, res, next) => {
    return database.delete_blog_by_id(req.collection, req.params.blog_hex_id).then(() => {
        req.previous_middleware_return = {operation: 'delete'}
        next()
    }, err => next(err))
})

router.delete('/:blog_hex_id/:article_index', checker.check_params(schema.blog_id_and_article_index),
    (req, res, next) => {
        database.delete_article_from_big_blog(req.collection, req.params.blog_hex_id, req.params.article_index).then(() => {
            req.previous_middleware_return = {operation: 'delete'}
            next()
        }, err => next(err))
    })

module.exports = router