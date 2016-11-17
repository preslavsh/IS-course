var stdin = process.openStdin();
var count;
var elements=[];
console.log("Please input steps count:");
stdin.addListener("data", function(d) { 
    var elem  = parseInt(d.toString().trim());
    console.log("Please input element");
    elements.push(elem);
    if(elements.length===count+1){
        
    };
});

var count = elements[0];