const toObjectID = require('mongodb').ObjectID.createFromHexString;
const assert = require('assert');

function list_blogs_by_range(collection, start, length, show_invisible) {
    let find_object = show_invisible ? {} : {visible: true}
    return collection.find(find_object, {limit: length, skip: start}).toArray() // 不需要进行错误检验，因为没必要检验。
}

function get_blog_by_id(collection, target_blog_hex_id) {
    return collection.findOne({'_id': toObjectID(target_blog_hex_id)}).then(result => {
        assert.ok(result)
        return result
    })
}

function get_document_count(collection, include_invisible) {
    if (include_invisible){
        return collection.estimatedDocumentCount()
    } else {
        return collection.countDocuments({visible: true})
    }
}

function list_blogs_by_title_keyword() {}

module.exports = {list_blogs_by_range, get_blog_by_id, get_document_count}