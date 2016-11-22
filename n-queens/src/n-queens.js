var scheme, l, max;

function findConflicts(){
    var con = [];
    for(var i=0;i<l;i++){
        for(var j=0;j<l;j++){
            if(scheme[i][j]==='*' && hasConflicts(i,j)){
                con.push([i,j]);
            }
        }
    }
    return con;
}

function isDiagonalConflict(x,i,j){
    var plusX = x+1;
    var leftUp = (i-plusX>=0 && j-plusX>=0 && scheme[i-plusX][j-plusX]==='*');
    var leftDown = (i+plusX<l && j-plusX>=0 && scheme[i+plusX][j-plusX]==='*');
    var rightUp = (i-plusX>=0 && j+plusX<l && scheme[i-plusX][j+plusX]==='*');
    var rightDown = (i+plusX<l && j+plusX<l && scheme[i+plusX][j+plusX]==='*');  
    return (leftUp || leftDown || rightUp || rightDown);
}

function getConflictCount(i,j){
    var count=0; 
    var horizontal;
    for(var x=0; x<l; x++){
        horizontal = (x!==i && scheme[x][j]==='*');
        if(horizontal || isDiagonalConflict(x,i,j)){
            count++;
        }
    }
    return count;
}

function hasConflicts(i,j){
    return getConflictCount(i,j)!==0;
}

function clearConflicts(s,limit,m){
    scheme = s;
    l = limit;
    max = m;
    var conflicts = findConflicts();
    var num = conflicts.length;
    var c = 0;
    var cords;
    while(num!==0 && c!==max){
        c++;
        for(var x=0;x<conflicts.length;x++) {
            cords = conflicts[x];
            trySwappingConflicts(cords[0],cords[1]);
        }
        
        conflicts = findConflicts();
        num = conflicts.length;
    }
    return [c!==max,scheme];
}

function swap(i,j,index) {
    var temp = scheme[i][j];
    scheme[i][j] = scheme[i][index];
    scheme[i][index]=temp;
}

function trySwappingConflicts(i,j){
    var map = [];
    var conflictsCount = 0;
    for(var x=0;x<l;x++){
        conflictsCount = getConflictCount(i,x);
        map.push({count:conflictsCount,index:x});
    }
    map.sort((a,b)=>a.count>b.count);
    var index = map[0].index;
    swap(i,j,index);
}

module.exports = clearConflicts;