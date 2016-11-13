function Block(label, x,y){
    this.x = x;
    this.y = y;
    this.label = label;
    this.setPriority = (priority)=> {
        this.priority = priority;
    };
    this.equal = (tile)=>{
        return this.label == tile.label;
    };
}

module.exports = Block;
