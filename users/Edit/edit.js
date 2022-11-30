const {Client} = require('pg')
const express = require('express');

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(bodyParser.json());
module.exports = app;
const {v4: uuidv4} = require('uuid');


const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "bdProjeto"
})
client.connect();

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.status(401).end();

        req.id = decoded.id

        next();
    })
}

//--------------------------------------------------------------------------------
//GET all movies
app.get('/Emovies/', verifyJWT, (req, res) => {
    client.query(`SELECT *
                  FROM movies`, (err, results) => {
        if (err) throw err.message;
        res.status(200).json(results.rows);
    })
});

//GET movies with specific ID
app.get('/EgetMoviesByID/', verifyJWT, (req, res) => {
    client.query(`SELECT *
                  FROM movies
                  WHERE show_id = '${req.body.id}'`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
});

//GET movies by title
app.get('/EgetMovieByTitle/', verifyJWT, (req, res, results) => {
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

app.get('/EgetMovieByRY/', verifyJWT, (req, res, results) => {
    client.query(`SELECT *
                  FROM movies
                  WHERE release_year = ${req.body.year}`, (err, result, results) => {
//falta fazer verificacao se o ID nao existir na tabela
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
});
//POST new movie with specific info
app.post('/EpostMovie', verifyJWT, (req, res, error) => {
    let {

        type,
        title,
        director,
        cast,
        country,
        date_added,
        release_year,
        rating,
        duration,
        listed_in,
        description
    } = req.body

    let insertMovies = `INSERT INTO movies(show_id, type, title, director, "cast", country, date_added, release_year,
                                           rating, duration, listed_in, description)
                        VALUES ('${uuidv4()}', '${type}', '${title}', '${director}', '${cast}',
                                '${country}', '${date_added}', '${release_year}', '${rating}', '${duration}',
                                '${listed_in}', '${description}')`;

    client.query(insertMovies, (err) => {
        if (!err) {
            res.send('Movie inserted ')

        } else {
            console.log(err.message)
        }
    })


    client.end;
});
app.get('/EgetLastRecords/', verifyJWT, (req, res, results) => {
    client.query(`SELECT TOP 10 *
                  FROM movies
                  ORDER BY DESC `, (err, result) => {
        //falta fazer verificacao se o ID nao existir na tabela
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
});


//apaga um movie especifico
app.delete('/Emovies/', verifyJWT, (req, res) => {
    let insertQuery = `DELETE
                       FROM movies
                       WHERE show_id = ${req.body.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Movie deleted')
        } else {
            console.log(err.message)
        }
    })
    client.end;
});