const toObjectID = require('mongodb').ObjectID.createFromHexString;
const assert = require('assert');

function list_blogs_by_range(collection, start, length, invisible) {
    let find_object = invisible ? {} : {visible: true}
    return collection.find(find_object, {limit: length, skip: start}).toArray() // 不需要进行错误检验，因为没必要检验。
}

function get_blog_by_id(collection, target_blog_hex_id) {
    return collection.findOne({'_id': toObjectID(target_blog_hex_id)}).then(result => {
        assert.ok(result)
        return result
    })
}

function list_blogs_by_title_keyword() {

}