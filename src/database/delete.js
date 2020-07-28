const toObjectID = require('mongodb').ObjectID.createFromHexString;
const assert = require('assert');

function delete_blog_by_id(collection, target_blog_hex_id) {
    return collection.deleteOne({'_id': toObjectID(target_blog_hex_id)}).then((result) => {
        assert.strictEqual(result.deletedCount, 1) // 如果删除的内容并不是1条，则说明没有找到目标。
    })
}

function delete_article_from_big_blog(collection, target_big_blog_hex_id, target_article_id) {
    // 由于不能删除数据库中的最后一个文章，如果这么做了，这里将会产生一个特别的错误。因此在删除之前，会先走流程看看数据库里有几篇文章。
    return collection.findOne({'_id': toObjectID(target_big_blog_hex_id), 'type': 1}).then(result => {
        assert.ok(result)
        if (result.article.length === 1) {// 如果数据库中这篇大博文只有一个小文章，那就不能删除，返回错误。
            let err = new Error("Cannot delete the last article from a big blog.")
            err.name = "DeleteLastArticleError"
            throw err
        }
    }).then(() => {
        return collection.findOneAndUpdate({'_id': toObjectID(target_big_blog_hex_id)},
            {$pull: {article: {index: target_article_id}}}).then(result => {
            assert.ok(result.value)
        })
    })
}

function delete_comment() {
}

module.exports = {delete_blog_by_id, delete_article_from_big_blog}