const express = require('express');
const movies = require("../../movieData");
const bodyParser = require("body-parser");
const app = express();
let movieDirectory = movies;
app.use(bodyParser.json());

module.exports = app;
app.get('/movies', (req, res) => {
    res.send(movies );
});

app.get('/movies/:title', (req, res) => {
    const {title} = req.params;

    const movie = movieDirectory.find(b => b.title === title);

    if (!movie) return res.status(404).send(`O filme com esse nome não existe!`);

    res.send(movie)
});

