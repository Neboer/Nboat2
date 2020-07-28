// 没用的文件，用来描述一些模型。
var big_db = { // 存在于数据库内部的大主题博客
    title: '博客标题',
    big_cover: "https://博客大封面图",
    small_cover: "https://博客小封面图",
    description: "博客的说明",
    article: [{
        content: "一篇长长的markdown格式的博文。", index: 1, create_time: (new Date()),
        last_modified_time: (new Date()), HTML: '<div>一段示例的HTML！</div>'
    }, {
        content: "第二篇这样的博文", index: 2, create_time: (new Date()),
        last_modified_time: (new Date()), HTML: '<div>一段示例的HTML！</div>'
    }],
    type: 1, // 大主题博文
    create_time: (new Date()),
    last_modified_time: (new Date()),
    visible: true,
    tags: ['一个', '两个'],
    views: 10
}

var a = b.then(collection => collection.findOneAndUpdate(
    {'_id': mongo.ObjectID.createFromHexString("5f1edea47e40bd40214a9a2e")},
    {$set: {"cp.$[article].k": 16, "cp.$[article].time": new Date()}},
    {'arrayFilters': [{"article.id": 1}]}
))

// 注意，这里针对数据库而言的“in”，必然要有HTML。
var big_in = {
    title: '博客标题',
    big_cover: "https://博客大封面图",
    small_cover: "https://博客小封面图",
    description: "博客的说明",
    article: "初始第一篇博文，不能留空",
    HTML: '<div>实例代码</div>',
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
    index: "要修改的文章的编号",
    HTML: '<div>新文章的HTML代码</div>',
}, `浏览量++，修改可见性。`]