var fs = require('fs');
var parse = require('csv-parse');
var AStar = require('./astar.js');
var City = require('./city.js');
var inputFile='map.csv';
var data;
var cities = [];
var parser = parse({delimiter: ','}, function (err, row) {
    data = row;
});

var stream = fs.createReadStream(inputFile).pipe(parser);
stream.on('end',()=>{
    data.splice(0,1);
    //тук се парсват данните от .csv файла в POJO-та, за да ти е удобна 
    //работата с тях
    data.forEach((elem,index)=>{
        cities.push(new City(elem[0], elem.splice(1,elem.length),index));
    });
    //тук разцъкваш първият ти аргумент е началана точка, втория крайна
    var steps = AStar(cities[0],cities[14],cities);
    console.log(steps);
});
