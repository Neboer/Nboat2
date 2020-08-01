const config = require('config')
const db_connect = require('./database/connector')
const pages = require('./routes/frontend')
const express = require('express')
const backend = require('./routes/api')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


app = express()
app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/library', express.static('./front/library'))
db_connect(config.get('db.addr'), 'nboat', 'blog').then((collection) => {
    app.use((req, res, next) => {
        req.collection = collection
        req.isAuthed = !!(req.cookies && (req.cookies.secret === config.get("secret")));
        next()
    });

    app.use('/', pages)
    app.use('/api', backend)

    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError) {
            res.status(400).send(err.body)
        }
        next()
    })
    app.listen(3000, () => console.log('Its working on port 3000'))
})
