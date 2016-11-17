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

module.exports = City;