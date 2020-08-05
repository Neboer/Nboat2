// 终于到了这个大沙雕了，nboat亲身告诉了我们一个道理：模板渲染固然香，模板引擎固然强大，但是再nb它也不能jsx。
// 知道了，下次争取看看能不能用jsx重写nboat
// 草
const express = require('express')
const database = require('../../database')
const objectIDChecker = require('mongodb').ObjectID.isValid
const router = express.Router()
const config = require('config')
const assert = require('assert')

function editor_auth(req, res, next) {
    if (!req.isAuthed) {
        throw req.not_found_error
    }
    next()
}

router.get('/:blog_hex_id/metaEditor', editor_auth,(req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            res.render('editor/meta_editor.pug', {blog})
        }, err => next(err))
    } else next(req.not_found_error)
})

router.get('/:blog_hex_id/articleEditor', editor_auth,(req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            if (blog.type === 1) next(req.not_found_error)
            else res.render('editor/article_editor.pug', {blog})
        }, err => next(err))
    } else next(req.not_found_error)
})

//
router.get('/:blog_hex_id/:article_index/articleEditor', editor_auth,(req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            let article_index = parseInt(req.params.article_index)
            if (blog.type === 0 || isNaN(article_index) || (!blog.visible && !req.isAuthed)) next(req.not_found_error)
            else {
                let article_exist = blog.article.find(article1 => article1.index === article_index)
                if (!article_exist) next(req.not_found_error)
                else
                    res.render('editor/article_editor.pug', {blog, articleIndex: article_index})
            }

        }).catch(err => next(err))
    } else next(req.not_found_error)
})

router.get('/:blog_hex_id/articleCreator', editor_auth,(req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            if (blog.type === 0) next(req.not_found_error)
            else
                res.render('editor/article_editor.pug', {blog})
        })
    } else next(req.not_found_error)
})

router.get('/:blog_hex_id/halfFullEditor', editor_auth,(req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            if (blog.type === 1) next(req.not_found_error)
            else
                res.render('editor/half_full_editor.pug', {blog})
        })
    } else next(req.not_found_error)
})

router.get('/blogCreator', editor_auth,(req, res, next) => {
    res.render('editor/blog_creator.pug')
})

module.exports = router