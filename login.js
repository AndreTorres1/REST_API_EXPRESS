const {Client} = require('pg')
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const {response} = require("express");
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
module.exports = app;
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "admin",
    database: "bdProjeto"
})

client.connect();









// let login = (req, res) => {
//     client.query("SELECT * FROM WHERE email = $1 AND password = $2",
//         [req.body.email, req.body.password],
//         (err, result) => {
//             if (err) response.status(200).send({auth: false, message: "Erro a fazer login"});
//             if(result.rows.length > 0){
//                 let personalData = result.rows;
//                 let expiresIn = 24 * 60 * 60;
//                 let acessToken = jwt.sign({personalData},SECRET_KEY,{expiresIn:expiresIn})
//                 return result.status(200).send({auth:true, acess_Token:acessToken,expiresIn:expiresIn})
//
//             }else{
//                 return result.status(200).send({auth:false, message: "Erro ao fazer login"});
//             }
//         })
// }
//
//
// // app.post("/login", async (req, res, next) => {
// //     try {
// //         // tenta encontrar o user primeiro
// //         const foundEmail = await client.query(
// //             "SELECT * FROM users WHERE email=$1 LIMIT 1"
// //                 [req.body.email]
// //         );
// //         if (foundEmail.rows.length === 0) {
// //             return res.json({ message: "Email inválido" });
// //         }
// //         // if the user exists, let's compare their hashed password to a new hash from req.body.password
// //         const hashedPassword = await bcrypt.compare(
// //             req.body.password,
// //             foundEmail.rows[0].password
// //         );
// //         // bcrypt.compare returns a boolean to us, if it is false the passwords did not match!
// //         if (hashedPassword === false) {
// //             return res.status(400).json({ message: "Password Inválida" });
// //         }
// //         return res.json(200).json({ message: "Logged In" });
// //     } catch(err) {
// //         return next(err);
// //     }
// // });