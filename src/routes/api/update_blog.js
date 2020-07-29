const database = require('../../database')
const router = require('express').Router()
const validator = require('express-joi-validation').createValidator({})
const schema = require('./input_schema')
const showdown = require('showdown')
const converter = new showdown.Converter()

// 此函数的作用是减少重复代码的行数。
function route_to_next_and_send_error(thenable, request, next) {
    return thenable.then(() => {
        request.previous_middleware_return = {operation: 'update'}
        next()
    }, err => next(err))
}

// 根据hex_id更新大小博客的meta。
router.put('/:blog_hex_id/meta', validator.params(schema.blog_id),
    validator.body(schema.blog_meta), (req, res, next) => {
        route_to_next_and_send_error(
            database.update_blog_meta(req.collection, req.params.blog_hex_id, req.body), req, next
        )
    })

// 更新一个小博客中的文章内容
router.put('/:blog_hex_id/article', validator.params(schema.blog_id),
    validator.body(schema.blog_article_content), (req, res, next) => {
        route_to_next_and_send_error(
            database.update_small_blog_article(req.collection, req.params.blog_hex_id, req.body.article, converter.makeHtml(req.body.article)),
            req, next
        )
    })

// 更新一个小博客的meta和文章内容（全部更新）
router.put('/:blog_hex_id/full', validator.params(schema.blog_id),
    validator.body(schema.small_meta_with_article_content), (req, res, next) => {
        req.body.HTML = converter.makeHtml(req.body.article)
        route_to_next_and_send_error(
            database.update_small_blog_full(req.collection, req.params.blog_hex_id, req.body),
            req, next
        )
    })

// 更新大博文中小文章的内容
router.put('/:blog_hex_id/:article_index/article', validator.params(schema.blog_id_and_article_index),
    validator.body(schema.blog_article_content), (req, res, next) => {
        route_to_next_and_send_error(
            database.update_big_blog_article(req.collection, req.params.blog_hex_id, req.params.article_index,
                req.body.article, converter.makeHtml(req.body.article)),
            req, next
        )
    })

// 切换一个博文的显示属性
router.put('/:blog_hex_id/visibility', validator.params(schema.blog_id),
    validator.body(schema.blog_visibility_setter), (req, res, next) => {
        route_to_next_and_send_error(
            database.change_blog_visibility_by_hex_id(req.collection, req.params.blog_hex_id, req.body.visible),
            req, next
        )
    })

module.exports = router