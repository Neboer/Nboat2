const database = require('../../database')
const router = require('express').Router()
const validator = require('express-joi-validation').createValidator({passError:true})
const schema = require('./input_schema')
const showdown = require('showdown')
const converter = new showdown.Converter()

// 可以向这个接口提交两种类型的博文。
router.post('/newBlog', validator.body(schema.general_in), (req, res, next) => {
    req.body.HTML = converter.makeHtml(req.body.article)
    if (req.body.type === 0) {// 上传简单博文
        return database.create_simple_blog(req.collection, req.body) // 在main.js里绑定了数据库对象，作为中间件，惠于每个后来的使用者。
            .then(new_blog_hex_id => res.send({result: 'ok', id: new_blog_hex_id, operation: 'insert'}))
    } else {
        return database.create_big_blog(req.collection, req.body)
            .then(new_blog_hex_id => res.send({result: 'ok', id: new_blog_hex_id, operation: 'insert'}))
    }
})

// 向一篇大博文中添加一篇文章。
router.post('/:blog_hex_id/newArticle', validator.params(schema.one_blog_id_with_article_index),
    validator.body(schema.blog_article_content), (req, res, next) => {
        return database.create_article_into_big_blog(req.collection, req.params.blog_hex_id, req.body.article, converter.makeHtml(req.body.article))
            .then(new_article_index => res.send({result: 'ok', index: new_article_index, operation: 'insert'}))
    }
)

module.exports = router