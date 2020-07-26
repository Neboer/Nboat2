const config = require('config')
const db_connect = require('./database/connector')
const home = require('./routes/home')
const express = require('express')
app = express()
app.set('view engine', 'pug')
app.set('views', './src/views')

app.use('/library',express.static('./front/library'))
db_connect(config.get('db.addr'), 'nboat', 'blog').then((collection) => {
    app.use((req, res, next) => {
        req.collection = collection
        next()
    });
    app.use('/', home)
    app.listen(3000, () => console.log('Its working on port 3000'))
})
