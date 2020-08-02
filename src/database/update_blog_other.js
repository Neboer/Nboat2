const toObjectID = require('mongodb').ObjectID.createFromHexString;
const assert = require('assert');

function change_blog_visibility_by_hex_id(collection, blog_hex_id, set_to_visible) {
    return collection.findOneAndUpdate({'_id': toObjectID(blog_hex_id), visible: !set_to_visible},
        {$set: {visible: set_to_visible}}).then(result => {
        assert.ok(result.value)
    })
}

function increase_blog_total_visitor_by_hex_id(collection, blog_hex_id) {
    return collection.findOneAndUpdate({'_id': toObjectID(blog_hex_id)}, {
        $inc: {views: 1}
    }).then(result => {
        assert.ok(result.value)
    })
}

function upgrade_small_blog_to_big_blog_by_hex_id(collection, small_blog_hex_id) {
    return collection.findOne({'_id': toObjectID(small_blog_hex_id), type: 0}).then(result => {
        assert.ok(result)
        return [{
            content: result.article,
            HTML: result.HTML,
            index: 0,
            create_time: result.create_time,
            last_modified_time: result.last_modified_time
        }]
    }).then(new_article_array => collection.findOneAndUpdate({'_id': toObjectID(small_blog_hex_id)},
        {$set: {article: new_article_array, type: 1}}
        )
    )// 如果从上一个操作开始就已经失败，该操作不会被执行，并且一个错误会传递到调用者那里。
}

function update_blog_comment() {
}

module.exports = {
    change_blog_visibility_by_hex_id,
    increase_blog_total_visitor_by_hex_id,
    upgrade_small_blog_to_big_blog_by_hex_id
}