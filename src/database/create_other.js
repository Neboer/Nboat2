const toObjectID = require('mongodb').ObjectID.createFromHexString;
const assert = require('assert');

/**
 *
 * @param collection
 * @param target_big_blog_hex_id {String}
 * @param article_content {String}
 * @return Promise
 */
function create_article_into_big_blog(collection, target_big_blog_hex_id, article_content) {
    let new_article_index = 0;
    return collection.findOne({'_id': toObjectID(target_big_blog_hex_id)}).then((r) => {
        new_article_index = r.article.length
    }).then(() => {
        return collection.findOneAndUpdate({'_id': mongo.ObjectID(target_big_blog_hex_id)}, {
            $push: {
                article: {
                    content: article_content,
                    id: new_article_index
                }
            }
        })
    }).then((r) => {
        assert.ok(r.value)
        return new_article_index
    })
}

function create_a_comment() {

}