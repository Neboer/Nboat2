const express = require('express')
const database = require('../../database')
const test_router = express.Router()

test_router.get('/', (req, res) => {
    res.render('home/home.pug')
})

test_router.get('/testMetaEditor', (req, res, next) => {
    database.get_blog_by_id(req.collection, "5f20a0bad00acf6a4590408b").then(blog => {
        res.render('editor/meta_editor.pug', {debug: true})
    }).catch(err => next(err))
})
test_router.get('/testArticleEditor', (req, res, next) => {
    database.get_blog_by_id(req.collection, "5f20a0bad00acf6a4590408b").then(blog => {
        res.render('editor/article_editor.pug', {debug: true, blog})
    }, err => next(err))
})
test_router.get('/testMetaArticleEditor', (req, res) => {
    res.render('editor/meta_article_editor.pug', {debug: true})
})
test_router.get('/testFullEditor', (req, res) => {
    res.render('editor/full_editor.pug', {debug: true})
})


module.exports = test_router