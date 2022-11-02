const app = require('express').Router();
const movies = require('./movieData');
let movieDirectory = movies;

app.get('/view/movies', (req, res) => {
    res.send(movies);
});

app.get('/view/movies/:id', (req, res) => {
    const {id} = req.params;

    const movie = movieDirectory.find(b => b.show_id === id);

    if (!movie) return res.status(404).send(`O filme com o id ${id} não existe!`);

    res.send(movie)
});

