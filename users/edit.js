const app = require('express').Router();
const movies = require('./movieData');
let movieDirectory = movies;

app.get('/edit/movies', (req, res) => {
    res.send(movies);
});

app.get('/edit/movies/:id', (req, res) => {
    const {id} = req.params;

    const movie = movieDirectory.find(b => b.show_id === id);

    if (!movie) return res.status(404).send(`O filme com o id ${id} não existe!`);

    res.send(movie)
});

app.put('/edit/movies/:id', (req, res) => {

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