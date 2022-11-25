const {Client} = require('pg')
const express = require('express');
const movies = require("../../movieData");
const bodyParser = require("body-parser");
const app = express();
let movieDirectory = movies;
app.use(bodyParser.json());


const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "postgres"
})
client.connect();
//--------------------------------------------------------------------------------
//GET all movies
app.get('/movies', (req, res) => {
    res.send(movies);
});

//GET movies with specific ID
app.get('/movies/:id', (req, res) => {
    const {id} = req.params;

    const movie = movieDirectory.find(b => b.show_id === id);

    if (!movie) return res.status(404).send(`O filme com o id não existe!`);

    res.send(movie);

});
//GET movies by title
app.get('/movies/title/:title', (req, res) => {
    const {title} = req.body;

    const movie = movieDirectory.find(b => b.title === title);

    if (!movie) return res.status(404).send(`O filme com esse nome não existe!`);

    res.send(movie)
});
//POST new movie with specific info
app.post('/postMovie', (req, res) => {
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


app.put('/updateMovies/:id', (req, res) => {

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
module.exports = app;

// app.get('/edit/movies', (req, res) => {
//     res.send(movies);
// });
//
// app.get('/edit/movies/:id', (req, res) => {
//     const {id} = req.params;
//
//     const movie = movieDirectory.find(b => b.show_id === id);
//
//     if (!movie) return res.status(404).send(`O filme com o id ${id} não existe!`);
//
//     res.send(movie)
// });
//
// app.put('/edit/movies/:id', (req, res) => {
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