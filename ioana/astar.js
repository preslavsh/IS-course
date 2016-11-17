var BinaryHeap = require('./binary-heap.js');

function evristic(goal,next) {
    return next.nodes[goal.index][2];
}

function AStar(start,goal,cities) {
    var steps = [];
    start.setPriority(0);
    var frontier = new BinaryHeap([start]);
    var came_from = {};
    var cost_so_far = {};
    cost_so_far[start.label] = 0;
    var counter = 0;
    var current = undefined;
    var count = 0;
    var passed =[];
    while (!frontier.isEmpty()){
        current = frontier.getMinimum();
        steps.push(current.label);
        if (current.equal(goal)){
            console.log("found");
            break;
        };
        var neighbors = current.neighbors.map((n)=>cities[n]).filter((c)=>passed.indexOf(c.label)===-1);
        neighbors.forEach((next)=>{
            var csf = cost_so_far[current.label]?cost_so_far[current.label]:0;
            var csfn = cost_so_far[next.label]?cost_so_far[next.label]:0;
            var new_cost = csf +current.nodes[next.index][1];
            if(csfn===0 || new_cost < csfn) {
                cost_so_far[next] = new_cost;
                var priority = new_cost + evristic(goal,next);
                frontier.insert(next,priority);
            }
        });
        passed.push(current.label);
    }
    return steps;
}

module.exports = AStar;