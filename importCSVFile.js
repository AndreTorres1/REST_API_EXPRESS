const {parse} = require('csv-parse');
const fs = require('fs');
const {Client} = require("pg");
const topojson = require('csvtojson');
const mysql = require("mysql")
//este ficheiro "transforma" um ficheiro cvs (no caso deste projeto uma lista de filmes da netflix), e trasforma-o num array ou objeto
const csvData = [];


fs.createReadStream(__dirname + '/netflix_titles.csv')
    .pipe(
        parse({
            delimiter: ','
        })
    )
.on('data',function (dataRow){
    csvData.push(dataRow);
})
.on('end', function (){
    console.log(csvData);
});


//Importing do database
const  client = new Client({
    host: "localhost",
    user:"postgres",
    port:"5432",
    password:"admin",
    database:"postgres"
})

client.connect();

const csvFile = '/netflix_titles.csv';

topojson().fromFile(csvFile).then(source => {
    for(var i = 0; i < source.length; i++) {
        show_id = source[i]["show_idw"],
            type = source[i]["type"],
            title = source[i]["title"],
            director = source[i]["director"],
            cast = source[i]["cast"],
            country = source[i]["country"],
            data_added = source[i]["data_added"],
            release_year = source[i]["release_year"],
            rating = source[i]["rating"],
            duration = source[i]["duration"],
            listed_in = source[i]["listed_in"],
            description = source[i]["description"]


        var insertStatement = "INSERT INTO movies values (?,?,?,?,?,?,?,?,?,?,?,?)";
        var items = [show_id, type, title, director, cast, country, data_added, release_year, rating, duration, listed_in, description]

// Inserting data of current row into database
        con.query(insertStatement, items,
            (err, results, fields) => {
                if (err) {
                    console.log("Unable to insert item at row ", i + 1);
                    return console.log(err);
                }
            });
    }
    console.log("Records inserted into database successfully...!!");

});




