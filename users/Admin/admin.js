const {Client} = require('pg')
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser')
const movies = require('../../movieData');
const app = express();
const {getSaltSync, hashSync, compareSync} = require("bcrypt");
app.use(bodyParser.json());
let movieDirectory = movies;
module.exports = app;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "bdProjeto"
})

client.connect();
//SELECT all users in database
app.get('/getUsers/', (req, res) => {
    client.query(`SELECT *
                  FROM users`, (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows);
    })
});

//SELECT user by ID
app.get('/getUsersbyID/:id', (req, res) => {
    client.query(`SELECT *
                  FROM users
                  WHERE id = ${req.params.id}`, (err, result) => {
//falta fazer verificacao se o ID nao existir na tabela
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.delete('/deleteActor/:id', (req, res) => {
    client.query(`SELECT *
                  FROM users
                  WHERE cast = ${req.body.cast}`, (err, result) => {
//falta fazer verificacao se o ID nao existir na tabela
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

//
//POST(INSERT) NEW USERS
    app.post('/postUser/', (req, res) => {
        // let id = req.body.id;
        let email = req.body.email;
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let permissao = req.body.permissao;

        if (!req.body.email || !req.body.email || !req.body.permissao) {
            res.status(422).send({
                error: 'Todos os campos são obrigatórios'
            })
        }

        let insertQuery = `INSERT INTO users(email, password, permissao)
                           VALUES ('${email}', '${hashedPassword}', '${permissao}')`
        client.query(insertQuery, (err) => {
            if (!err) {
                res.send('Utilizador inserido')
            } else {
                console.log(err.message)
            }
        })

        client.end;

    });



//UPDATE user data
app.put('/updateUser/:id', (req, res) => {
    let user = req.body;
    let updateQuery = `update users
                       set email     = '${user.email}',
                           password  = '${user.password}',
                           permissao = '${user.permissao}'
                       where id = ${user.id}`

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
app.delete('/deleteUser/:id', (req, res) => {
    let insertQuery = `DELETE
                       FROM users
                       WHERE id = ${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('User apagado')
        } else {
            console.log(err.message)
        }
    })
    client.end;
})


//--------------------------------------------------------------------------------
//GET all movies
app.get('/movies', (req, res) => {
    res.send(movies);
});

//GET movies with specific ID
app.get('/movies/:id', (req, res) => {
    const {id} = req.params;

    const movie = movieDirectory.find(b => b.show_id === id);

    if (!movie) return res.status(404).send(`O filme com o id ${id} não existe!`);

    res.send(movie);

});
//POST new movie with specific info
app.post('/movies', (req, res) => {
    const {
        show_id,
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
    } = req.body;

    const movieExist = movieDirectory.find(m => m.show_id === show_id);
    if (movieExist) return res.send('O filme já existe ');

    const movie = {
        show_id,
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

    };
    movieDirectory.push(movie);
    res.send(movie);
});


app.put('/movies/:id', (req, res) => {

    const {id} = req.params;
    const {
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
    } = req.body;

    const movie = movieDirectory.find(m => m.show_id === id);
    if (!movie) return res.send('Este filme não existe');


    //update nos campos abaixo mencionados, no caso de n ao preenchemros o campo com info nova ele mostra a default
    const updateField = (val, prev) => !val ? prev : val;
    const updatedMovie = {
        ...movie,
        type: updateField(type, movie.type),
        title: updateField(title, movie.title),
        director: updateField(director, movie.director),
        cast: updateField(cast, movie.cast),
        country: updateField(country, movie.country),
        date_added: updateField(date_added, movie.date_added),
        release_year: updateField(release_year, movie.release_year),
        rating: updateField(rating, movie.rating),
        duration: updateField(duration, movie.duration),
        listed_in: updateField(listed_in, movie.listed_in),
        description: updateField(description, movie.description),

    };
    const movieIndex = movieDirectory.findIndex(m => m.show_id === id)
    movieDirectory.splice(movieIndex, 1, updatedMovie);

    res.send(updatedMovie)
});

//apaga um movie especifico
app.delete('/movies/:id', (req, res) => {
    const {id} = req.params;
    let movie = movieDirectory.find(m => m.show_id === id);

    //se o movie com o id fornecido nao existir imprime uma mensagem de erro (404)
    if (!movie) return res.status(404).send(`O filme com o id fornecido nao existe`);

    movieDirectory = movieDirectory.filter(m => m.show_id !== id);

    res.send('Filme apagado');
});

