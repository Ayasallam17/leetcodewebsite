const express = require("express");
const body_parser = require('body-parser');
const routes = require('./src/routes/routes')
const db = require('./src/config/db.config')
const PORT = 3000;

const app = express();
app.use(body_parser.urlencoded({
    extended : true
}))
app.use(body_parser.json())
app.use(express.json())
app.use(routes)

//db.sequelize.sync({force : true})
app.listen(PORT)