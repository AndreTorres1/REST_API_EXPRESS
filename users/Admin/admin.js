const {Client} = require('pg')
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser')

const app = express();
require('dotenv').config();
app.use(bodyParser.json());

module.exports = app;
const {v4: uuidv4} = require('uuid');
let {response} = require("express");
const jwt = require("jsonwebtoken");
const {rows} = require("pg/lib/defaults");
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

//SELECT all users in database
app.get('/getUsers/', verifyJWT, (req, res) => {
    client.query(`SELECT *
                  FROM users`, (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows);
    })
});

//SELECT user by ID
app.get('/getUsersbyID/', (req, res) => {
    client.query(`SELECT *
                  FROM users
                  WHERE id::uuid = '${req.body.id}' `, (err, result) => {
//falta fazer verificacao se o ID nao existir na tabela
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

//
//POST(INSERT) NEW USERS
app.post('/postUser/', verifyJWT, (req, res) => {
    let email = req.body.email;
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let permissao = req.body.permissao;

    if (!req.body.email || !req.body.email || !req.body.permissao) {
        res.status(422).send({
            error: 'Todos os campos são obrigatórios'
        })
    }
    let insertQuery = `INSERT INTO users(id, email, password, permissao)
                       VALUES ('${uuidv4()}', '${email}', '${hashedPassword}', '${permissao}')`

    client.query(insertQuery, (err) => {
        if (!err) {
            res.send('User inserted')
        } else {
            console.log(err.message)
        }
    })

    client.end;
});

//UPDATE user data
app.put('/updateUser', verifyJWT, (req, res) => {
    let user = req.body;
    let hashedUpadtePassword = bcrypt.hashSync(user.password, 8);
    let updateQuery = `UPDATE users
                       SET email     = '${user.email}',
                           password  = '${hashedUpadtePassword}',
                           permissao = '${user.permissao}'
                       WHERE id = '${user.id}'`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update com sucesso')
        } else {
            console.log(err.message)
        }
    })
    client.end;
})
//DELETE
app.delete('/deleteUser/', verifyJWT, (req, res) => {
    let insertQuery = `DELETE
                       FROM users
                       WHERE id = '${req.body.id}'`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('User apagado')
        } else {
            console.log(err.message)
        }
    })
    client.end;
})


//----------------------------------------------------------MOVIES-----------------------------------------------------\\
//GET all movies
app.get('/movies/', verifyJWT, (req, res) => {
    client.query(`SELECT *
                  FROM movies`, (err, results) => {
        if (err) throw err.message;
        res.status(200).json(results.rows);
    })
});

//GET movies with specific ID
app.get('/getMoviesByID/', verifyJWT, (req, res) => {
    client.query(`SELECT *
                  FROM movies
                  WHERE show_id = '${req.body.id}'`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
});

//GET movies by title
app.get('/getMovieByTitle/', verifyJWT, (req, res, results) => {
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

app.get('/getMovieByRY/', verifyJWT, (req, res, results) => {
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
app.post('/postMovie', verifyJWT, (req, res, error) => {
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
app.get('/getLastRecords/', verifyJWT, (req, res, results) => {
    client.query(`SELECT TOP 10 *
                  FROM movies
                  ORDER BY  DESC `, (err, result) => {
        //falta fazer verificacao se o ID nao existir na tabela
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
});


// app.put('/movies/:id', (req, res) => {
//
//     const {id} = req.params;
//     const {
//         type,
//         title,
//         director,
//         cast,
//         country,
//         date_added,
//         release_year,
//         rating,
//         duration,
//         listed_in,
//         description
//     } = req.body;
//
//     const movie = movieDirectory.find(m => m.show_id === id);
//     if (!movie) return res.send('Este filme não existe');
//
//
//     //update nos campos abaixo mencionados, no caso de n ao preenchemros o campo com info nova ele mostra a default
//     const updateField = (val, prev) => !val ? prev : val;
//     const updatedMovie = {
//         ...movie,
//         type: updateField(type, movie.type),
//         title: updateField(title, movie.title),
//         director: updateField(director, movie.director),
//         cast: updateField(cast, movie.cast),
//         country: updateField(country, movie.country),
//         date_added: updateField(date_added, movie.date_added),
//         release_year: updateField(release_year, movie.release_year),
//         rating: updateField(rating, movie.rating),
//         duration: updateField(duration, movie.duration),
//         listed_in: updateField(listed_in, movie.listed_in),
//         description: updateField(description, movie.description),
//
//     };
//     const movieIndex = movieDirectory.findIndex(m => m.show_id === id)
//     movieDirectory.splice(movieIndex, 1, updatedMovie);
//
//     res.send(updatedMovie)
// });

//apaga um movie especifico
app.delete('/movies/', verifyJWT, (req, res) => {
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

