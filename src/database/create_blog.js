const assert = require('assert');

/**
 *
 * @param collection
 * @param {{title: String,big_cover: String,
    small_cover: String,
    description: String,
    article: String,
    HTML: String
    visible: boolean,
    tags: Array}} small_in 用户输入的新的小博客的原型
 * @return Promise, promise中你收到的第一个参数是新创建博客的hex id。
 */

function create_simple_blog(collection, small_in) {
    let small_db = {
        ...small_in, ...{
            create_time: new Date(),
            last_modified_time: new Date(),
            views: 0,
            type: 0,
            comment: []
        }
    }
    return collection.insertOne(small_db).then(result => {
        assert.strictEqual(result.insertedCount, 1)
        return result.insertedId.toHexString()
    })
}

/**
 *
 * @param collection
 * @param {{title: String,big_cover: String,
    small_cover: String,
    description: String,
    article: String,
    HTML: String,
    visible: boolean,
    tags: Array}} big_in 用户输入的新的大博客的原型
 */
function create_big_blog(collection, big_in) {
    let big_db = {
        ...big_in, ...{
            create_time: new Date(),
            last_modified_time: new Date(),
            views: 0,
            type: 1,
            comment: []
        }
    }
    big_db.article = [{
        content: big_in.article,
        HTML: big_in.HTML,
        index: 0,
        create_time: new Date(),
        last_modified_time: new Date()
    }]
    delete big_db.HTML
    return collection.insertOne(big_db).then(result => {
        assert.strictEqual(result.insertedCount, 1)
        return result.insertedId.toHexString()
    })
}

module.exports = {create_simple_blog, create_big_blog}