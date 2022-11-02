const {Client} = require('pg')
const express = require('express');
const app = express();
module.exports = app;
const  client = new Client({
    host: "localhost",
    user:"postgres",
    port:"5432",
    password:"admin",
    database:"postgres"
})









