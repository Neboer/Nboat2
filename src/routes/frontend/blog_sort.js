const express = require('express')
const database = require('../../database')
const objectIDChecker = require('mongodb').ObjectID.isValid
const router = express.Router()
const config = require('config')
const assert = require('assert')

// 页面暂未开放
router.get('/sort', (req, res) => {
    res.render("sort.pug")
})

router.get('/blog/:blog_hex_id', (req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            if (blog.type === 1) res.redirect(req.url + "/" + blog.article[0].index)
            else {
                res.render('blog/small_blog_view.pug', {blog, isAuthed: req.isAuthed})
            }
        }, err => next(err))
    } else {
        next(req.not_found_error)
    }
})

router.get('/blog/:blog_hex_id/:article_index', (req, res, next) => {
    if (objectIDChecker(req.params.blog_hex_id)) {
        database.get_blog_by_id(req.collection, req.params.blog_hex_id).then(blog => {
            if (blog.type === 0 || isNaN(req.params.article_index)) next(req.not_found_error)
            let article_index = Number(req.params.article_index)
            let article_exist = false
            blog.article.map(article1 => {
                if (article1.index === article_index) article_exist = true
            })
            if (!article_exist) next(req.not_found_error)
            res.render('blog/big_blog_view.pug', {blog, isAuthed: req.isAuthed, articleIndex: article_index})
        }).catch(err => next(err))
    } else {
        next(req.not_found_error)
    }
})

module.exports = router