const database = require('src/database')
const router = require('express').Router()
const validator = require('express-joi-validation').createValidator({})
const schema = require('./input_schema')
const showdown = require('showdown')
const converter = new showdown.Converter()

// 根据hexid更新大小博客的meta。
router.put('/:blog_hex_id/meta', validator.params(schema.one_blog_id_with_article_index),
    validator.body(schema.blog_meta), (req, res, next) => {
        return database.update_blog_meta(req.collection, req.params.blog_hex_id, req.body)
    })

// 更新一个小博客中的文章内容
router.put('/:blog_hex_id/article', validator.params(schema.one_blog_id_with_article_index),
    validator.body(schema.blog_article_content), (req, res, next) => {
        return database.update_small_blog_article(req.collection, req.params.blog_hex_id, req.body.article, converter.makeHtml(req.body.article))
    })

// 更新大博文中小文章的内容
router.put('/:blog_hex_id/:article_index/article', validator.params(schema.one_blog_id_with_article_index),
    validator.body(schema.blog_article_content), (req, res, next) => {
        return database.update_big_blog_article(req.collection, req.params.blog_hex_id, req.params.article_index,
            req.body.article, converter.makeHtml(req.body.article))
    })

// 切换一个博文的显示属性
router.put('/:blog_hex_id/visibility', validator.params(schema.one_blog_id_with_article_index),
    validator.body(schema.blog_visibility_setter), (req, res, next) => {
        return database.change_blog_visibility_by_hex_id(req.collection, req.params.blog_hex_id, req.body.visible)
    })

router.use((req, res, next) => {
    res.send({result: 'ok', operation: 'update'})
})

module.exports = router