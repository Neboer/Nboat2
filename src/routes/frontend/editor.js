// 终于到了这个大沙雕了，nboat亲身告诉了我们一个道理：模板渲染固然香，模板引擎固然强大，但是再nb它也不能jsx。
// 知道了，下次争取看看能不能用jsx重写nboat
// 草
const express = require('express')
const database = require('../../database')
const objectIDChecker = require('mongodb').ObjectID.isValid
const router = express.Router()
const config = require('config')
const assert = require('assert')

router.use((req, res, next) => {
    if (!req.isAuthed) {
        throw req.not_found_error
    }
    next()
})

//
router.get('/:blog_hex_id/metaEditor', (req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            res.render('editor/meta_editor.pug', {blog})
        }, err => next(err))
    } else {
        next(req.not_found_error)
    }
})

router.get('/:blog_hex_id/articleEditor', (req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            if (blog.type === 1) next(req.not_found_error)
            else res.render('editor/article_editor.pug', {blog})
        }, err => next(err))
    } else {
        next(req.not_found_error)
    }
})

//
router.get('/:blog_hex_id/:article_index/articleEditor', (req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            if (blog.type === 0 || isNaN(req.params.article_index)) next(req.not_found_error)
            let article_index = Number(req.params.article_index)
            let article_exist = false
            blog.article.map(article1 => {
                if (article1.index === article_index) article_exist = true
            })
            if (!article_exist) next(req.not_found_error)
            res.render('editor/article_editor.pug', {blog, articleIndex: article_index})
        }, err => next(err))
    } else {
        next(req.not_found_error)
    }
})

router.get('/:blog_hex_id/articleCreator', (req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            if (blog.type === 0) next(req.not_found_error)
            res.render('editor/article_editor.pug', {blog})
        })
    } else {
        next(req.not_found_error)
    }
})

router.get('/:blog_hex_id/halfFullEditor', (req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            if (blog.type === 1) next(req.not_found_error)
            res.render('editor/half_full_editor.pug', {blog})
        })
    } else {
        next(req.not_found_error)
    }
})

router.get('/blogCreator', (req, res, next) => {
    res.render('editor/blog_creator.pug')
})

module.exports = router