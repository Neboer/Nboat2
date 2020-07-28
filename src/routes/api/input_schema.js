// Joi validate对象。终于不用写schema了吗？好期待啊！
const Joi = require('@hapi/joi')

// 无论是big_blog还是small_blog，在最初创建的时候传入的肯定是这些参数。
const general_in = Joi.object({
    title: Joi.string().required(),
    big_cover: Joi.string().uri({scheme: ['http', 'https']}),
    small_cover: Joi.string().uri({scheme: ['http', 'https']}),// 如果没有封面图片可以不传，此时这个值不会存入数据库，为undefined。在渲染模板的时候会根据状态进行适应。
    description: Joi.string().required(),
    article: Joi.string().required(),
    visible: Joi.boolean().required(),
    tags: Joi.array().items(Joi.string()).required(), // 如果没有tag，也得传一个空数组过来。
    type: [1, 2]
})

// 分页查找，用户只能输入要访问的页码。
const pagination = Joi.object({
    page: Joi.number().integer().default(1) // 如果不传页码，默认访问第一页。实际展示((page-1)*blogs_count_per_page, page*b_c_p_p)
})

// 广泛适用于大小博文的任何精确定位性操作
const one_blog_id_with_article_index = Joi.object({
    blog_hex_id: Joi.string().hex().length(24).required(),
    article_index: Joi.number().integer() // 因为是在params里传进来的，因此必须开转换！！！此变量可以留空，会在调用它的函数里继续解释.
})

// 无论是大博文还是小博文，都可以用这些属性作为自己的meta。meta信息在修改的时候一定要作为整体一并修改替换，同时影响到“last_modified”标签。
const blog_meta = Joi.object({
    title: Joi.string().required(),
    big_cover: Joi.string().uri({scheme: ['http', 'https']}),
    small_cover: Joi.string().uri({scheme: ['http', 'https']}),// 如果没有封面图片可以不传，此时这个值不会存入数据库，为undefined。在渲染模板的时候会根据状态进行适应。
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
})

// 更新整个小博文，包括meta和article
const small_meta_with_article_content = Joi.object({
    title: Joi.string().required(),
    big_cover: Joi.string().uri({scheme: ['http', 'https']}),
    small_cover: Joi.string().uri({scheme: ['http', 'https']}),// 如果没有封面图片可以不传，此时这个值不会存入数据库，为undefined。在渲染模板的时候会根据状态进行适应。
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    article: Joi.string().required()
})

// 大博文和小博文更新（或大博文新提交）文章内容的通用的消息体，注意大博文有put的uri params来分别是哪个文章
const blog_article_content = Joi.object({article: Joi.string().required()})

// 切换博客的可见性。
const blog_visibility_setter = Joi.object({visible: Joi.boolean()})

// 切换小博客为大博客就算了，这只需要提供小博客的id就够了
module.exports = {
    general_in,
    pagination,
    one_blog_id_with_article_index,
    blog_meta,
    small_meta_with_article_content,
    blog_article_content,
    blog_visibility_setter
}