const {parse} = require('csv-parse');
const fs = require('fs');

//este ficheiro "transforma" um ficheiro cvs no caso deste projeto uma lista de filmes da netflix, e trasforma-o num array ou objeto
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