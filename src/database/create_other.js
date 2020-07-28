const toObjectID = require('mongodb').ObjectID.createFromHexString;
const assert = require('assert');

/**
 * @param collection
 * @param target_big_blog_hex_id {String}
 * @param article_content {String}
 * @param HTML {String}
 * @return Promise
 */
function create_article_into_big_blog(collection, target_big_blog_hex_id, article_content, HTML) {
    let new_article_index = 0;
    return collection.findOne({'_id': toObjectID(target_big_blog_hex_id)}).then((r) => {
        new_article_index = Math.max.apply(Math, r.article.map(function (o) {
            return o.index;
        }))
    }).then(() => {
        return collection.findOneAndUpdate({'_id': toObjectID(target_big_blog_hex_id)}, {
            $push: {
                article: {
                    content: article_content,
                    HTML: HTML,
                    id: new_article_index,
                    create_time: new Date(),
                    last_modified_time: new Date()
                }
            },
            $set: {
                last_modified_time: new Date()
            }
        })
    }).then((r) => {
        assert.ok(r.value)
        return new_article_index
    })
}

function create_a_comment() {
}

module.exports = {create_article_into_big_blog}