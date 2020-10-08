const database = require('../../database')
const router = require('express').Router()
const checker = require('./cele_joi_middleware')
const schema = require('./input_schema')
const showdown = require('showdown')
const converter = new showdown.Converter()

// 可以向这个接口提交两种类型的博文。
router.post('/newBlog', checker.check_body(schema.general_in) , (req, res, next) => {
    req.body.HTML = converter.makeHtml(req.body.article)
    let create_operation;
    if (req.body.type === 0) {// 上传简单博文
        create_operation = database.create_simple_blog(req.collection, req.body)
    } else {
        create_operation = database.create_big_blog(req.collection, req.body)
    }
    create_operation.then(new_blog_hex_id => {
        req.previous_middleware_return = {
            id: new_blog_hex_id,
            operation: 'create'
        }
        next()
    }, err => next(err))
})

// 向一篇大博文中添加一篇文章。
router.post('/:blog_hex_id/newArticle', checker.check_params(schema.blog_id),
    checker.check_body(schema.blog_article_content), (req, res, next) => {
        database.create_article_into_big_blog(req.collection, req.params.blog_hex_id, req.body.article, convvaerter.makeHtml(req.body.article))
            .then(new_article_index => {
                req.previous_middleware_return = {
                    index: new_article_index,
                    operation: 'create'
                };
                next()
            }, err => next(err))
    }
)

module.exports = router