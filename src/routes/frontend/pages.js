const express = require('express')
const page_router = express.Router()

page_router.get('/', (req, res) => {
    res.render('home/home.pug')
})

page_router.get('/testMetaEditor', (req, res) => {
    res.render('editor/meta_editor.pug', {debug: true})
})
page_router.get('/testArticleEditor', (req, res) => {
    res.render('editor/article_editor.pug', {debug: true})
})
page_router.get('/testMetaArticleEditor', (req, res) => {
    res.render('editor/meta_article_editor.pug', {debug: true})
})
page_router.get('/testFullEditor', (req, res) => {
    res.render('editor/full_editor.pug', {debug: true})
})


module.exports = page_router