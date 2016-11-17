var BinaryHeap = require('./binary-heap.js');
var LEFT ='left';
var RIGHT ='right';
var UP = 'up';
var DOWN = 'down';
var LIMIT = undefined;

function manhattanDistance(goal,next) {
    var startX = goal.x;
    var startY = goal.y;
    var endX = next.x;
    var endY = next.y;
    return Math.abs(startX-endX) + Math.abs(startY-endY);
}

function getNeighbors(tile,puzzle){
    var neighbors = [];
    var x = tile.x;
    var y = tile.y;
    if(x-1!=-1){
       neighbors.push(puzzle[x-1][y]);
    };
    if(x+1!=LIMIT){
        neighbors.push(puzzle[x+1][y])
    }
    if(y-1!=-1){
        neighbors.push(puzzle[x][y-1]);
    }
    if(y+1!=LIMIT){
        neighbors.push(puzzle[x][y+1]);
    }
    return neighbors;
}

function getDirection(last,current){
    if(last.x > current.x && last.y===current.y) {
        return UP;
    } else if(last.x < current.x && last.y=== current.y) {
        return DOWN;    
    } else if(last.y > current.y && last.x === current.x) {
       return LEFT;
    } else if(last.y < current.y && last.x === current.x) {
       return RIGHT;
    }
    return '';
}

function AStar(start,goal,puzzle,limit) {
    start.setPriority(0);
    var steps = [];
    var frontier = new BinaryHeap([start]);
    LIMIT = limit;
    var came_from = {};
    var cost_so_far = {};
    cost_so_far[start.label] = 0;
    var counter = 0;
    var last = undefined;
    var current = undefined;
    while (!frontier.isEmpty()){
        current = frontier.getMinimum();

        if(last){
            steps.push(getDirection(last,current));
        };

        if (current.equal(goal)){
            return steps;
        };
        var neighbors = getNeighbors(current,puzzle);
        neighbors.forEach((next)=>{
            var csf = cost_so_far[current.label]?cost_so_far[current.label]:0;
            var csfn = cost_so_far[next.label]?cost_so_far[next.label]:0;
            var new_cost = csf +1;
            if(csf===0 || new_cost < csfn) {
                cost_so_far[next] = new_cost;
                var priority = new_cost + manhattanDistance(goal,next);
                frontier.insert(next,priority);
            }
        })
        last = current;
    }
}

module.exports = AStar;
