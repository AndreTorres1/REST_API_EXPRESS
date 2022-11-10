//variaveis / requires
const express = require('express');
const api = require('./src/api');
const apiAdmin = require('./users/Admin/admin')
const getUser = require('./database')
const app = express();
const port = 8080;
const bodyParser = require('body-parser')
const path = require("path");
// const {client} = require('./BaseDados/connection');
app.use(bodyParser.urlencoded({extended: true}));


app.use(bodyParser.json());
app.use('/api/v1/admin/', api);
app.use('/api/v1/user/', getUser);

app.use('/api/v1/admin/', apiAdmin);

//Login page
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

//Admin pages
app.get('/api/v1/admin/',(req,res) => {
    res.sendFile(path.join(__dirname,'./users/Admin/adminPage.html'));
});

app.get('/api/v1/admin/users',(req,res) => {
    res.sendFile(path.join(__dirname,'./users/Admin/userAdminPage.html'));
});

//Edit
app.get('/api/v1/edit/users/',(req,res) => {
    res.sendFile(path.join(__dirname,'./users/Edit/EditPage.html'));
});

//View
app.get('/api/v1/view/users/',(req,res) => {
    res.sendFile(path.join(__dirname,'./users/View/viewPage.html'));
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});