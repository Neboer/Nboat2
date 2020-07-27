const mongo = require('mongodb');
const assert = require('assert');

function delete_blog_by_id(collection, target_blog_hex_id) {
    return collection.deleteOne({'_id': mongo.ObjectID(target_blog_hex_id)}).then((result) => {
        assert.strictEqual(result.deletedCount, 1) // 如果删除的内容并不是1条，则说明没有找到目标。
    })
}

function delete_article_from_big_blog(collection, target_big_blog_hex_id, target_article_id) {
    return collection.findOneAndUpdate({'_id': mongo.ObjectID(target_big_blog_hex_id)}, {$pull: {article: {index: target_article_id}}}).then(
        result => {
            assert.ok(result.value)
        }
    )
}

function delete_comment() {

}