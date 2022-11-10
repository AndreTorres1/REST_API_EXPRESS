const {Client} = require('pg')
const express = require('express');
const {body} = require("express-validator");
const path = require("path");
const app = express();
module.exports = app;
// const inputs = require('../Admin/userAdminPage.html');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "postgres"
})

client.connect();
//SELECT user by ID
app.get('/getUsersbyID/:id_user', (req, res) => {
    let id = req.body.id;
    client.query(`SELECT *
                  FROM users
                  WHERE id = ?`, [req.params.id],
        (err, result, fields) => {
            if (err) console.log('error SELECT one row', err);
        });
});

//SELECT all users in database

    app.get('/getUsers', (req, res) => {
        client.query(`SELECT *
                  FROM users`, (err, result) => {

            if (!err) {
                res.send(result.rows);
            }
        })
    });



//POST(INSERT) NEW USERS
app.post('/auth/register', (req, res) => {
    // let id_user = req.body.id_user;
    let email = req.body.email;
    let password = req.body.password;
    let permissao = req.body.permissao;
    // console.log(id_user);
    console.log(password);
    let insertQuery = `INSERT INTO users (email, password, permissao)
                       VALUES ('${email}', '${password}', '${permissao}')`;

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.redirect('/api/v1/admin/users');
        } else {
            console.log(err.message);
            console.error("Erro ao inserir os dados");
        }
    });
    console.log(req.body);

    client.end;
});
//UPDATE user data
function updateUser() {
    app.put('/updateUser/', (req, res) => {
        let user = req.body.id_user;
        let email = req.body.email;
        let password = req.body.password;
        let permissao = req.body.permissao;
        let updateQuery = `UPDATE users SET email = '${email}', password  = '${password}', permissao = '${permissao}'
                       WHERE id = ${user.id}`

        client.query(updateQuery, (err, result) => {
            if (!err) {
                res.redirect('/api/v1/admin/users');
            } else {
                console.log(err.message)
            }
        })
        client.end;
    })
}

//DELETE
app.delete('/deleteUser/:id', (req, res) => {
    let insertQuery = `delete
                       from users
                       where id = ${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.redirect('/api/v1/admin/users');
        } else {
            console.log(err.message)
        }
    })
    client.end;
})