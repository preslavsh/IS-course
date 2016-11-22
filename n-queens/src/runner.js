var scheme= [];
var clearConflicts = require('./n-queens.js');

function create(l){
     for(var i=0;i<l;i++){
        scheme[i]=[];
        for(var j=0;j<l;j++){
            scheme[i][j]='_';
        }
    }
}

function random(l){
    return Math.floor((Math.random() * l));;
}

function place(l){
    for(var i=0;i<l;i++){
        var pos = random(l);
        scheme[i][pos]='*';
    }
}

function run(l,max){
    create(l);
    place(l);
    var done = clearConflicts(scheme,l,max);
    return [done,scheme];
}

module.exports = run;




