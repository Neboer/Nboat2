// 删除和更新都是需要知道目标的操作，因此一起实现。
const express = require('express')
const damb_router = express.Router()

// 这些路由最后匹配的路径大概是/api/blog/xxxxxx_blog_id
damb_router.delete('/:id',(req, res) => {
    
})