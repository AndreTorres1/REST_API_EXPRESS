// // AuthController.jsvar express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());
// var User = require('../user/User');
// const express = require("express");
const {Client} = require("pg");

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "bdProjeto"
})

client.connect();


const findUserbyID = (id) => {
    const query = `
        SELECT *
        FROM users
        WHERE id = $1`
    return client.oneOrNone(query, [id])
}

const verifyUser = (email) => {
    const query = `
        SELECT *
        FROM users
        WHERE email = $1`
    return client.oneOrNone(query, [email])
}


const jwt = require('jwt-simple');
const config = require('../config');
const bcrypt = require('bcrypt');
const {createUser} = require("../users/Admin/admin");

const tokenForUser = (user) => {
    const timestamp = new Date().getTime()
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}

const signIn = (req, res, next) => {
    res.send({token: tokenForUser(req.user)})
}

const signup = (req, res, next) => {
    const {email, password} = req.body
    const saltRounds = 12

    if (!email || !password) {
        res.status(422).send({
            error: 'Introduza um email e password'
        })
    }

    bcrypt.hash(password, saltRounds)
        .then((hash,) => {
            return createUser(email, password, hash)
                .then((newUser) => {
                    res.json({token: tokenForUser(newUser)})
                })
                .catch((err) => {
                    res.json({error: 'Erro ao guardar utilizador'})
                })
        })
        .catch((err) => {
            return next(err)
        })
}

// module.exports = {
//     findUserbyID, verifyUser, signup
//     , signIn
// }