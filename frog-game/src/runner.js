function swap(left, right,field){
    var x = field[left];
    field[left] = field[right];
    field[right]=x;
}

function generateField(c){
    var field =[];
    for(var i=0;i<2*c+1;i++){
        if(i<c){
            field.push('>')
        }else if(i>c){
            field.push('<');
        }else{
            field.push('_');
        }
    }
    return field;
}

function isOrdered(currentIndex,dir,frog,prev,field){
    var isTrue = true;
    var j = currentIndex-dir;
    while(j>=0 && j<field.length){
        if(field[j]!==frog){
            isTrue = false;
            break;
        }
        j-=dir;
    }
    if(!isTrue){
        return prev!==frog
    }
    return isTrue;
}

function run(c){
   var steps =[];
   var i=1;
   var dir = -1;
   var currentIndex = c;
   var field = generateField(c);
   var plus1,plus2,frog,prev,isOk;
   steps.push(field.join(''));
   while(i<=c*c+4*c){
       plus1 = field[currentIndex+dir];
       plus2 = field[currentIndex+2*dir];
       frog = dir===1?'<':'>'; 
       prev = field[currentIndex-dir];
       isOk = isOrdered(currentIndex,dir,frog,prev,field);
       if(plus1 && plus1===frog && isOk){
           swap(currentIndex,currentIndex+dir,field);
           currentIndex = currentIndex+dir;
           steps.push(field.join(''));
       }else if(plus2 && plus2===frog && isOk){
           swap(currentIndex,currentIndex + 2*dir,field)
           currentIndex  = currentIndex + 2*dir;
           steps.push(field.join(''));    
       }else{
           dir = -dir;
       }
       i++;
   }
   return steps;
}

module.exports = run;