const database = require('../../database')
const router = require('express').Router()
const validator = require('express-joi-validation').createValidator({})
const schema = require('./input_schema')

function delete_successful(res) {
    return function () {
        res.send({result: 'ok', operation: 'delete'})
    }
}

// 删去整个博文，大小都算在内，也可以按index删去大博文中的某文章。
// 注意！！！！！！**博客主题必须至少有一篇文章，不能删去大博客中唯一的一篇文章！删去文章以及更新文章的时候，即使是第一篇博客也一定要带上第一篇博客的id，不能擅自省略！**
// 这些内容将会在数据库日程中检测。
router.delete('/:blog_hex_id/:article_index', validator.params(schema.one_blog_id_with_article_index), (req, res, next) => {
    if (req.params.article_index) { // 传递article_index一定是删去大博文中的小文章，不传一定是删去整个博文，无论大小。
        return database.delete_article_from_big_blog(req.collection, req.params.blog_hex_id, req.params.article_index).then(delete_successful(res))
    } else {
        return database.delete_blog_by_id(req.collection, req.params.blog_hex_id).then(delete_successful(res))
    }
})

module.exports = router