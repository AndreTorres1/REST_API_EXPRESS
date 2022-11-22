//variaveis / requires
// import Authentication from "./controllers/authentication";

const express = require('express');
const apiAdmin = require('./users/Admin/admin')
const apiEdit = require('./users/Edit/edit')
const apiView = require('./users/View/view')
const AuthController = require('./users/Admin/admin')
const app = express();
const port = 8080;
const bodyParser = require('body-parser')
const {router} = require("express/lib/application");
const result = require("pg/lib/query");
const {Client} = require("pg");
const passport = require("passport")
// import authentication from './authentication'
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "bdProjeto"
})

client.connect();

const verifyUser = (email) => {
    const query = `SELECT *
                   FROM users
                   WHERE email = $1`
    // return client.oneOrNone(query.[email])
}
// const requireAuth = passport.authenticate('jwt', {session: false});
app.use(bodyParser.json());

// app.use('/api/v1/auth');
app.use('/api/v1/admin', apiAdmin);
app.use('/api/v1/edit', apiEdit);
app.use('/api/v1/view', apiView);


app.post('/login' )
//Login page
app.get('/', (req, res) => {
    res.send('ola')
});


app.listen(port, () => {
    console.log(`Servidor a correr na porta ${port}`)
});







