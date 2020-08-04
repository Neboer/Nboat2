const express = require('express')
const database = require('../../database')
const router = express.Router()
const config = require('config')

router.get('/', (req, res) => {
    res.render('home/home.pug', {isAuthed: req.isAuthed})
})

router.get('/newest', (req, res, next) => {
    res.redirect('/newest/1')
})

router.get('/newest/:page', (req, res, next) => {
    let page = parseInt(req.params.page)
    database.get_document_count(req.collection, req.isAuthed).then(document_count => {
        let page_capacity = config.get('blogs_in_one_page')
        let total_page = Math.ceil(document_count / page_capacity)
        if (isNaN(page)||page > total_page||page < 1) {
            next(req.not_found_error)
        } else {
            database.list_blogs_by_range(req.collection, page_capacity * (page - 1), page_capacity * page, req.isAuthed).then(blogList => {
                res.render('list/blog_list.pug', {
                    isAuthed: req.isAuthed,
                    blogList,
                    currentPage: page,
                    totalPage: total_page
                })
            })
        }
    })
})

module.exports = router