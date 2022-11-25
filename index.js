//variaveis / requires

const express = require('express');
const apiAdmin = require('./users/Admin/admin');
const apiEdit = require('./users/Edit/edit');
const apiView = require('./users/View/view');
const apiInsertCSV = require('./importCSVFile');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const {Client} = require("pg");

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

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

// app.use('/api/v1/auth');
app.use('/api/v1/userToken/admin', apiAdmin);
app.use('/api/v1/userToken/edit', apiEdit);
app.use('/api/v1/userToken/view', apiView);

// app.use('/api/v1/users/login')

//Login page
app.get('/', (req, res) => {
    res.send('ola')
});


app.listen(port, () => {
    console.log(`Servidor a correr na porta ${port}`)
});







