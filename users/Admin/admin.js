const {Client} = require('pg')
const express = require('express');
const app = express();
module.exports = app;
// const inputs = require('../Admin/userAdminPage.html');
const  client = new Client({
    host: "localhost",
    user:"postgres",
    port:"5432",
    password:"admin",
    database:"postgres"
})

client.connect();
//SELECT user by ID
app.get('/getUsersById/:id', (req, res) => {
    client.query(`SELECT * FROM users WHERE id = ?`, [ req.params.id ],
        (err, result, fields) => {
            if (err) console.log('error SELECT one row', err);
        });
});

//SELECT all users in database
app.get('/getUsers',(req,res)=>{
    client.query(`Select * from users`,(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    })
});

//POST(INSERT) NEW USERS
app.post('/postUser',  (req,res)=>{
    let id = req.body.id;
    let email = req.body.email;
    let password = req.body.password;
    let permissao = req.body.permissao;

    let insertQuery = `insert into users(id, email, password, permissao)
                        values('${id.id}','${email.email}','${password.password}','${permissao.permissao}')`
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Sucesso')
        }
        else{
            console.log(err.message)
        }
    })
    client.end;
});
//UPDATE user data
app.put('/updateUser/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set email = '${user.email}',
                       password = '${user.password}',
                       permissao = '${user.permissao}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update com sucesso')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
//DELETE
app.delete('/deleteUser/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('User apagado')
        }
        else{ console.log(err.message) }
    })
    client.end;
})