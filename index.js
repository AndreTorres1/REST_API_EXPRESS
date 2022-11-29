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
const passportService = require('./services/passport');
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

// app.use('/api/v1/auth');
app.use('/api/v1/admin',verifyJwt, apiAdmin);
app.use('/api/v1/edit',verifyJwt, apiEdit);
app.use('/api/v1/view',verifyJwt, apiView);
app.use('/api/v1', apiLogin);




// app.use('/api/v1/users/login')

// //Login page
// app.get('/', requireAuth, (req, res) => {
//     res.json(token())
// });
// app.post('/login', Authentication.signup)


app.listen(port, () => {
    console.log(`Servidor a correr na porta ${port}`)
});







