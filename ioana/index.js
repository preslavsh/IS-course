var fs = require('fs');
var parse = require('csv-parse');
var BinaryHeap = require('./binary-heap.js');
var inputFile='map.csv';
var data;
var cities = [];
var parser = parse({delimiter: ','}, function (err, row) {
    data = row;
});

function City(label,nodes,index){
    this.label = label;
    this.index = index;
    this.nodes = nodes.reduce((acc,node)=>{
        var nums = node.split('|').map((n)=>parseInt(n));
        acc.push(nums);
        return acc;
    },[]);
    this.neighbors=[];
    this.nodes.forEach((el,index)=>{
        if(el[0]!==-1 && el[1]!==-1 && el[0]!==0 && el[1]!==0){
            this.neighbors.push(index);
        };
    });
}

City.prototype.setPriority = function(priority){
    this.priority = priority;
};

City.prototype.equal = function(other){
    return this.label === other.label;
};

function evristic(goal,next) {
    return next.nodes[goal.index][2];
}

function binHeap(){
    this.data = [];
    this.insert = function(elem,priority){
        if(this.data.filter((d)=>d.label===elem.label).length===0){
            this.data.push(elem);
        }
        this.data.filter((d)=>d.label===elem.label).forEach((el)=>el.setPriority(priority));
        this.data.sort((a,b)=>a.priority<=b.priority);
    };
    this.get = function(){
        return this.data.pop();  
    };
    this.isEmpty = function(){ return this.data.length===0};
}

function AStar(start,goal) {
    var steps = [];
    //start.setPriority(0);
    //var frontier = new BinaryHeap([start]);
    var frontier = new binHeap();
    frontier.insert(start,0);
    var came_from = {};
    var cost_so_far = {};
    cost_so_far[start.label] = 0;
    var counter = 0;
    var current = undefined;
    var count = 0;
    var passed =[];
    console.log(goal);
    while (!frontier.isEmpty()){
        //current = frontier.getMinimum();
        current = frontier.get();
        //console.log(current);
        steps.push(current.label);
        if(count === 3){
            console.log(current,frontier);
        }
        if (current.equal(goal)){
            console.log("found");
            break;
        };
        if(count===20){
            break;
        }
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
       // console.log(count,frontier);
        count++;
    }
    console.log(steps);
}

var stream = fs.createReadStream(inputFile).pipe(parser);
stream.on('end',()=>{
    data.splice(0,1);
    data.forEach((elem,index)=>{
        cities.push(new City(elem[0], elem.splice(1,elem.length),index));
    });
    AStar(cities[0],cities[14]);
});
