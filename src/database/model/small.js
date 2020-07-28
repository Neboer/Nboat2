// 没用的文件，用来描述一些模型。
// 这里的in是针对数据库层而言的。数据库只负责存储HTML，它并不编译，编译是消息处理系统的工作。
var small_db = { // 存在于数据库内部的小博客的model
    title: '博客标题',
    big_cover: "https://博客大封面图",
    small_cover: "https://博客小封面图",
    description: "博客的说明",
    article: "一篇长长的markdown格式的博文。",
    HTML:'<div>编译好的HTML。</div>',
    type: 0, //小博文
    create_time: (new Date()),
    last_modified_time: (new Date()),
    visible: true,
    tags: ['一个','两个'],
    views: 10
}

var small_in = {
    title: '博客标题',
    big_cover: "https://博客大封面图",
    small_cover: "https://博客小封面图",
    description: "博客的说明",
    article: "一篇长长的markdown格式的博文。",
    HTML:'<div>编译好的HTML。</div>',
    visible: true,
    type: 0,
    tags: ['一个','两个']
}

// 作为列表一项输出或者是单个博文的详细信息
var small_out = small_db

var small_modify = [
    {
        title: '博客标题',
        big_cover: "https://博客大封面图",
        small_cover: "https://博客小封面图",
        description: "博客的说明",
        tags: ['一个','两个']
    },{
        article: "一篇长长的markdown格式的博文。",
        HTML:'<div>编译好的HTML。</div>',
    },`升级blog type到主题博客，浏览量++，修改可见性。`,
    {
        title: '博客标题',
        big_cover: "https://博客大封面图",
        small_cover: "https://博客小封面图",
        description: "博客的说明",
        tags: ['一个','两个'],
        article: "一篇长长的markdown格式的博文。",
        HTML:'<div>编译好的HTML。</div>',
    }
]