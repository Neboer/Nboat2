const express = require('express')
const { errors } = require('celebrate');
const main_api_router = express.Router()
const sub_routers = [
    require('./create_blog'),
    require('./delete_blog'),
    require('./update_blog')
]

function api_auth(req, res, next) {
    if (!req.isAuthed) {
        res.status(401).send("not authed")
    } else next()
}

main_api_router.use(api_auth)

main_api_router.use(sub_routers)

main_api_router.use((req, res) => {
    if (req.previous_middleware_return) {
        req.previous_middleware_return.result = 'ok'
        res.send(req.previous_middleware_return)
    } else {
        // 如果上一个中间件没有任何返回，
        res.status(404).send("no such api")
    }
})

main_api_router.use(errors())

main_api_router.use((err, req, res, next) => {
    console.info(err)
    if (err.type === 'body') {// schema错了。
        res.status(400).send(err.error.details)
    } else if (err.name === 'AssertionError') {// 断言错误，就是目标不存在。
        res.status(404).send('Your request target isn\'t exist or meet your api.')
    } else if (err.name === 'DeleteLastArticleError'){
        res.status(400).send('Cannot delete the last blog in blog list!.')
    }
    else {
        res.status(400).send('invalid request')// 未知类型的错误，如果可能发生数据库内部错误则记录，再匹配。
        console.error(err)
    }
})

module.exports = main_api_router