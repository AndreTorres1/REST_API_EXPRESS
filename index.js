const express = require('express');
const app = express();
const port = 8080;
const shortID = require('shortid');
//"ensina" o express a ler um json file
app.use(express.json())
let movies = []

let category = []

//sempre que alguem tenta aceder ao localhost:port irá parar a este path
app.get('/', (req, res) => {
    res.json({
        hello: "world"
    })
});

//------------------------------------GET´S AREA-----------------------------------------\\


//vai buscar a informacao colada no post *1
app.get('/api/movies', (req, res) => {
    res.status(200).json(movies);
});
// *****CATEGORY********
app.get('/api/category', (req, res) => {
    res.status(200).json(category);
});


//------------------------------------POST AREA-----------------------------------------\\
//guarda a informacao do POST no req(request) *1   ******MOVIES*******
app.post('/api/movies', (req, res) => {
    const movieInfo = req.body;
    //atribuir um ID gerado automaticamente atraves da biblioteca uniqueID para o objecto movieInfo
    movieInfo.id = shortID.generate();
    movies.push(movieInfo);
    res.status(201).json(movieInfo)
});

//                                               ******CATEGORIAS*******
app.post('/api/category', (req, res) => {
    const categoryData = req.body;
    categoryData.id = shortID.generate()
    category.push(categoryData);
    res.status(201).json(categoryData)
});


//------------------------------------DELETE AREA-----------------------------------------\\

app.delete("api/movies/:id", (req, res) => {
    //transforma o id de um body em params retirando assim toda a informacao associada a esse id
    const { id } = req.params;
    //verifica se existisse, se nao exisitir nao apaga(pk nao tem nada para apagar -.-)
    const deleted = movies.find(movie => movie.id === id);
console.log(deleted)
    if (deleted) {
        console.log();
        //criamos um array novo e passamos o array gerado pelo id fornecido, ou seja ele pega num array novo pega no que é para ser apagado e transforma-o no array novo criado
        movies = movies.filter(movie => movie.id !== id)
        res.status(200).json(deleted);
    } else {
        console.log(deleted);
        res
            .status(404)
            .json({message: "Este filme nao existe!"})
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});

