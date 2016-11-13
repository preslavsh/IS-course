var AStar = require('./astar.js');

function run(count,puzzle){
    var limit = Math.sqrt(count+1);
    var steps = [];
    function findCordinates(elem){
        var cords = [];
        for(var i=0; i<limit; i++){
            for(var j=0; j<limit;j++){
                if(puzzle[i][j].label===elem){
                    cords = [i,j]; 
                    break;
                }
            }
        }
        return cords;
    }

    for(var i=0; i<limit; i++){
        for(var j=0; j<limit;j++){
            var sum = i*limit+j+1;
            var real= sum===(count+1)?0:sum;
            if(puzzle[i][j].label!==real && real !==0) {
                var cords = findCordinates(real);
                steps = steps.concat(AStar(puzzle[cords[0]][cords[1]],puzzle[i][j],puzzle,limit));
            }
        }
    }

    return {count:steps.length,steps:steps};
}

module.exports =run;
