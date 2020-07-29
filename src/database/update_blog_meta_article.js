const toObjectID = require('mongodb').ObjectID.createFromHexString;
const assert = require('assert');

function update_blog_plain_part(collection, target_blog_hex_id, part, required_blog_type = -1) {
    // required blog type是-1意为大小博文都可以，否则其只能等于大小博文之一。
    let filter_object = {
        '_id': toObjectID(target_blog_hex_id),
    }

    if (required_blog_type !== -1) filter_object.type = required_blog_type

    part.last_modified_time = new Date()

    return collection.findOneAndUpdate(filter_object, {$set: part}).then(
        result => assert.ok(result.value)
    )
}

/**
 *
 * @param collection
 * @param target_blog_hex_id
 * @param {{
 *     title: String,
 *     big_cover: String,
       small_cover: String,
       description: String,
       tags: Array
 * }} meta
 */
let update_blog_meta = update_blog_plain_part; // part is meta here

/**
 *
 * @param collection
 * @param target_blog_hex_id
 * @param article_content
 * @param HTML
 */
function update_small_blog_article(collection, target_blog_hex_id, article_content, HTML) {
    return update_blog_plain_part(collection, target_blog_hex_id, {article: article_content, HTML: HTML}, 0)
}

// 特别提醒：plain_blog中，直接有article和HTML这两个属性，它们直接覆盖原有的article和HTML。
function update_small_blog_full(collection, target_blog_hex_id, plain_blog) {
    return update_blog_plain_part(collection, target_blog_hex_id, plain_blog, 0)
}

function update_big_blog_article(collection, target_blog_hex_id, target_article_id, article_content, HTML) {
    return collection.findOneAndUpdate({'_id': toObjectID(target_blog_hex_id), type: 1},
        {
            $set: {
                "article.$[art].content": article_content,
                "article.$[art].HTML": HTML,
                "article.$[art].last_modified_time": new Date()
            }
        },
        {arrayFilters: [{"art.id": target_article_id}]}).then(result => assert.ok(result.value))
}

module.exports = {update_blog_meta, update_small_blog_article, update_small_blog_full, update_big_blog_article}