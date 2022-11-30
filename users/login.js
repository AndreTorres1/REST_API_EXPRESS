const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const {v4: uuidv4} = require('uuid');
module.exports = app;
const dotenv = require('dotenv');

dotenv.config();
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const {Client} = require("pg");
const {hash} = require("bcrypt");
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "bdProjeto"
})
client.connect();

function jwtTokens({id, email}) {
    const user = {id, email};
    const accessToken = jwt.sign(user, process.env.JWT_KEY, {expiresIn: '20m'});
    return ({accessToken});
}

app.post('/login', async (req, res, error) => {

    try {
        console.log(req.cookies, req.get('origin'))
        const {email, password} = req.body;
        const users = await client.query(`SELECT *
                                          FROM users
                                          WHERE email = $1`, [email]);

        if (users.rows.length === 0) return res.status(401).json({error: 'email incorrect'});
        const validPassword = await bcrypt.compare(password, users.rows[0].password);
        if (!validPassword) return res.status(401).json({error: 'password incorrect'});

        let tokens = jwtTokens(users.rows[0]);
        res.json(tokens)
        // if (req.body.email === 'andre@gmail.com' && req.body.password === '1234') {
        //     const token = jwt.sign({id: 1}, process.env.JWT_KEY, {expiresIn: 300});
        //     return res.json({auth: true, token});
        // }
        // res.status(401).end();
    } catch (error) {
        res.status(401).json({error: error.message});
    }

})

