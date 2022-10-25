const app = require('express').Router();
module.exports = app;
const movies = require('../data/movieData');
const users = require('../data/usersData');
const express = require("express");
app.use(express.static('public'));
let userDirectory = users;
let movieDirectory = movies;
// const shortid = require('shortid')


app.get('/movies', (req, res) => {
    res.send(movies);
});



//GET movies by ID
app.get('/movies/:id', (req, res) => {
    const {id} = req.params;

    const movie = movieDirectory.find(b => b.show_id === id);


    res.send(movie)
});


//PUT(UPDATE) movies by ID
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


//-------------------CRUD USERS-------------------\\
app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:userName', (req, res) => {
    const {userName} = req.params;

    const user = userDirectory.find(b => b.userName === userName);

    if (!userName !== userName) return res.send(`Este Username ${userName} já existe`);
    res.send(user)
});


app.delete('/users/:userName', (req, res) => {
    const {userName} = req.params;
    let user = userDirectory.find(m => m.userName === userName);

    //se o movie com o id fornecido nao existir imprime uma mensagem de erro (404)
    if (!user) return res.status(404).send(`O utilizador com o Username ${userName} não existe`);

    userDirectory = userDirectory.filter(m => m.userName !== userName);

    res.send('Utilizador apagado');
});


app.post('/users', (req, res) => {
    const {
        userName,
        email,
        password,
        permissao
    } = req.body;

    
    const user = {
        userName,
        email,
        password,
        permissao

    };
    movieDirectory.push(user);
    res.send(user);
});
// app.post()