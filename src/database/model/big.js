// 没用的文件，用来描述一些模型。
var big_db = { // 存在于数据库内部的大主题博客
    title: '博客标题',
    big_cover: "https://博客大封面图",
    small_cover: "https://博客小封面图",
    description: "博客的说明",
    article: [{content: "一篇长长的markdown格式的博文。", index: 1}, {content: "第二篇这样的博文", index: 2}],
    type: 1, // 大主题博文
    create_time: (new Date()).toDateString(),
    last_modified_time: (new Date()).toDateString(),
    visible: true,
    tags: ['一个', '两个'],
    views: 10
}

var big_in = {
    title: '博客标题',
    big_cover: "https://博客大封面图",
    small_cover: "https://博客小封面图",
    description: "博客的说明",
    article: "初始第一篇博文，不能留空",
    type: 1, // 大主题博文
    visible: true,
    tags: ['一个', '两个'],
}

// 巨大的主题博文
var big_out = big_db

var big_update = [{
    title: '博客标题',
    big_cover: "https://博客大封面图",
    small_cover: "https://博客小封面图",
    description: "博客的说明",
    tags: ['一个', '两个']
}, {
    content: "一篇长长的markdown格式的博文。",
    index: "要修改的文章的编号"
}, `浏览量++，修改可见性。`]