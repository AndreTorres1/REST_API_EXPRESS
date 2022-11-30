//variaveis / requires

const express = require('express');
const apiAdmin = require('./users/Admin/admin');
const apiEdit = require('./users/Edit/edit');
const apiView = require('./users/View/view');
const apiLogin = require('./users/login');
const app = express();
require('dotenv').config()
const port = 8080;
const bodyParser = require('body-parser');
const {Client} = require("pg");
const  Authentication = require('./controllers/authentication')
const swaggerUI = require('swagger-ui-express');
const passport = require('passport');
const verifyJwt = require('./users/login')
const requireAuth = passport.authenticate('jwt',{session:false})

const generateAcessToken = require('./users/user.controller')
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "bdProjeto"
})

client.connect();
const options = require('./doc/swagger.json')

const swaggerConfig = {
    ...require("./doc/swagger.json")
};

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig))
// const verifyUser = (email) => {
//     const query = `SELECT *
//                    FROM users
//                    WHERE email = $1`
//     // return client.oneOrNone(query.[email])
// }
// const requireAuth = passport.authenticate('jwt', {session: false});
app.use(bodyParser.json());


app.use('/api/v1/admin', apiAdmin);
app.use('/api/v1/edit',apiEdit);
app.use('/api/v1/view', apiView);
app.use('/api/v1', apiLogin);


app.listen(port, () => {
    console.log(`Servidor a correr na porta ${port}`)
});







