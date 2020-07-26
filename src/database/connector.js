const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// 返回一个promise，可以继续操作。
function connect_and_get_collection(url, dbName, collectionName) {

    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    const client = new MongoClient(url);
    return client.connect().then(client => {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        return db.collection(collectionName)
    })
}

module.exports = connect_and_get_collection