//variaveis / requires
const express = require('express');
const api = require('./src/api');
const apiAdmin = require('./users/admin')
const getUser = require('./database')
const app = express();
const port = 8080;
const bodyParser = require('body-parser')
// const {client} = require('./BaseDados/connection');
app.use(bodyParser.urlencoded({extended: true}));           


app.use(bodyParser.json());
app.use('/api/v1', api);
app.use('/api/v1/admin', apiAdmin);
app.use('/api/v1/user', getUser)


app.get('/', (req, res) => {
    res.send("<h1>Welcome to the world of Express!</h1>");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});













// let movies = []
// let entity = []
// let category = []


//sempre que alguem tenta aceder ao localhost:port irá parar a este path
// app.get('/', (req, res) => {
//     res.json({
//         hello: "world"
//     })
// });


//-----------------------------------Admin Area-----------------------------------------\\
//Cria um novo utilizador com x permissao
// app.post('/api/Admin/register/NewUser', (req, res) => {
//     const categoryData = req.body;
//     categoryData.id = shortID.generate()
//     category.push(categoryData);
//     res.status(201).json(categoryData)
// });

// app.post('/api/Admin/entidades/newEntity', (req, res) => {
//     const entidades = req.body;
//     entidades.id = shortID.generate()
//     entity.push(entidades);
//     res.status(201).json(entidades)
// });

//apaga entidade com x id
// app.delete('/api/Admin/entidades/:id', (req, res) => {
//     const {id} = req.params;
//     //verifica se existisse, se nao exisitir nao apaga(pk nao tem nada para apagar -.-)
//     const deleted = movies.find(movie => movie.id === id);
//     if (deleted) {
//         //criamos um array novo e passamos o array gerado pelo id fornecido, ou seja ele pega num array novo pega no que é para ser apagado e transforma-o no array novo criado
//         movies = movies.filter(movie => movie.id !== id)
//         res.status(200).json(deleted);
//     } else {
//         console.log(deleted);
//         res
//             .status(404)
//             .json({message: "Esta entidade nao existe!"})
//     }
// });


//visualiza entidades
// app.get('/api/Admin/entidades/entity', (req, res) => {
//     res.status(200).json(entity);
// });
//edita os campos de um determinado id
// app.post('/api/Admin/register/editEntity/:id', (req, res) => {
//     const categoryData = req.body;
//     categoryData.id = shortID.generate()
//     category.push(categoryData);
//     res.status(201).json(categoryData)
// });

//-----------------------------------View Area-----------------------------------------\\
//pode visualizar dados das entidades
// app.get('/api/movies', (req, res) => {
//     res.status(200).json(movies);
// });


//-----------------------------------Edit Area-----------------------------------------\\

//O utilizador edit tem permissao de ir buscar todos os filme.

// *****CATEGORY********
// app.get('/api/category', (req, res) => {
//     res.status(200).json(category);
// });


//------------------------------------GET´S AREA-----------------------------------------\\


// app.get('a', function(req, res){
//     var actors = req.params.actors;
//     res.status(200).json(actors);
//
// });
//vai buscar a informacao colada no post *1
// app.get('/api/movies', (req, res) => {
//     res.status(200).json(movies);
// });


//Vai buscar um filme com um ID especifico
// app.get('/api/movies/:id', (req, res) => {
//     const {id} = req.params;
//     const getMovieByID = movies.find(movie => movie.id === id);
//
//     if (getMovieByID) {
//         res.status(200).json(getMovieByID)
//     } else {
//         res.status(404).json({message: "O filme nao existe"})
//     }
// });


//Vai buscar um ator de um determinado filme
// app.get('/api/movies/?actors=Thabang Molaba', (req, res) => {
//     const {actors} = req.params;
//     const getActorByID = movies.find(actors => actors.id === actors);
//
//
//     if (getActorByID) {
//         res.status(200).json(getActorByID)
//     } else {
//         res.status(404).json({message: `Não existe nenhum filme com o ator(a) ${actors}`})
//     }
//     res.status(200).json(actors);
// });
//------------------------------------POST AREA-----------------------------------------\\
//guarda a informacao do POST no req(request) *1   ******MOVIES*******
// app.post('/api/movies', (req, res) => {
//     const movieInfo = req.body;
//     //atribuir um ID gerado automaticamente atraves da biblioteca uniqueID para o objecto movieInfo
//     .id = shortID.generate();
//     movies.push(movieInfo);
//     res.status(201).json(movieInfo)
// });


// //                                               ******CATEGORIAS*******
// app.post('/api/category', (req, res) => {
//     const categoryData = req.body;
//     categoryData.id = shortID.generate()
//     category.push(categoryData);
//     res.status(201).json(categoryData)
// });
//

//------------------------------------DELETE AREA-----------------------------------------\\

// app.delete('/api/movies/:id', (req, res) => {
//     const { id } = req.params;
//     //verifica se existisse, se nao exisitir nao apaga(pk nao tem nada para apagar -.-)
//     const deleted = movies.find(movie => movie.id === id);
//     if (deleted) {
//         //criamos um array novo e passamos o array gerado pelo id fornecido, ou seja ele pega num array novo pega no que é para ser apagado e transforma-o no array novo criado
//         movies = movies.filter(movie => movie.id !== id)
//         res.status(200).json(deleted);
//     } else {
//         console.log(deleted);
//         res
//             .status(404)
//             .json({message: "Este filme nao existe!"})
//     }
// });
//
// //                                                  ****CATEGORIAS******
// app.delete('/api/category/:id', (req, res) => {
//     const { id } = req.params;
//     //verifica se existisse, se nao exisitir nao apaga(pk nao tem nada para apagar -.-)
//     const deleted = category.find(categ => categ.id === id);
//     if (deleted) {
//         //criamos um array novo e passamos o array gerado pelo id fornecido, ou seja ele pega num array novo pega no que é para ser apagado e transforma-o no array novo criado
//         category = category.filter(categ => categ.id !== id)
//         res.status(200).json(deleted);
//     } else {
//         console.log(deleted);
//         res
//             .status(404)
//             .json({message: "Esta categoria nao existe!"})
//     }
// });




