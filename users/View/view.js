const express = require('express');
const bodyParser = require("body-parser");
const {Client} = require("pg");
const jwt = require("jsonwebtoken");
const app = express();
app.use(bodyParser.json());
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "bdProjeto"
})
client.connect();
module.exports = app;
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.status(401).end();

        req.id = decoded.id

        next();
    })
}
app.get('/Vmovies/', verifyJWT, (req, res) => {
    client.query(`SELECT *
                  FROM movies`, (err, results) => {
        if (err) throw err.message;
        res.status(200).json(results.rows);
    })
});
app.get('/VgetMovieByTitle/', verifyJWT, (req, res, results) => {
    client.query(`SELECT *
                  FROM movies
                  WHERE title = '${req.body.title}'`, (err, result) => {
//falta fazer verificacao se o ID nao existir na tabela

        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
});

app.get('/VgetMovieByRY/', verifyJWT, (req, res, results) => {
    client.query(`SELECT "type","title","director","cast","country","date_added","release_year","rating","duration","listed_in","description",
                  FROM movies
                  WHERE release_year = ${req.body.year}`, (err, result, results) => {
//falta fazer verificacao se o ID nao existir na tabela
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
});

