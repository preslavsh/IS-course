module.exports = (function () {
    BinaryHeap.prototype = Object.create(Array.prototype);

    function BinaryHeap(arr) {
	if(!(arr instanceof Array)) return this; 
        arr.forEach(function(el){
            this.push(el);
            this.bubbleDown();
        }.bind(this));
    }

    BinaryHeap.prototype.swap = function (first, second) {
        var temp = this[first];
        this[first] = this[second];
        this[second] = temp;
    }

    BinaryHeap.prototype.bubbleDown = function () {
        var lastIndex = this.length - 1;
        var last = this[lastIndex];
        var parentIndex = this.parentIndex(lastIndex);
        var parent = this[parentIndex];
        while (parent && last.priority < parent.priority) {
            this.swap(parentIndex, lastIndex);
            lastIndex = parentIndex;
            last = this[lastIndex];
            parentIndex = this.parentIndex(lastIndex);
            parent = this[parentIndex];
        }
    }

    BinaryHeap.prototype.parentIndex = function (searched) {
        return Math.floor((searched - 1) / 2);
    }

    BinaryHeap.prototype.leftIndex = function (searched) {
        return searched * 2 + 1;
    }

    BinaryHeap.prototype.rightIndex = function (searched) {
        return searched * 2 + 2;
    }

    BinaryHeap.prototype.parentElement = function (searched) {
        return this[this.parentIndex(searched)];
    }

    BinaryHeap.prototype.leftElement = function (searched) {
        return this[this.leftIndex(searched)];
    }

    BinaryHeap.prototype.rightElement = function (searched) {
        return this[this.rightIndex(searched)];
    }

    BinaryHeap.prototype.isEmpty = function () {
        return this.length === 0;
    }

    BinaryHeap.prototype.insert = function (elem,priority) {
        if(this.filter((d)=>d.label===elem.label).length===0){
            this.push(elem);
        }
        this.filter((d)=>d.label===elem.label).forEach((el)=>el.setPriority(priority));
        this.bubbleDown();
		return this.toString();
    }

    BinaryHeap.prototype.bubbleUp = function () {
        var first = this[0];
        var firstIndex = 0;
        var leftIndex = this.leftIndex(firstIndex);
        var rightIndex = this.rightIndex(firstIndex);
        var left = this[leftIndex];
        var right = this[rightIndex];
        while (firstIndex < this.length - 2 && left && right) {
            if (first.priority <= left.priority && first.priority <= right.priority) {
                break;
            } else if (left.priority <= right.priority) {
                this.swap(firstIndex, leftIndex);
                firstIndex = leftIndex;
            } else if (right.priority <= left.priority) {
                this.swap(firstIndex, rightIndex);
                firstIndex = rightIndex;
            } else {
                break;
            }
            first = this[firstIndex];
            leftIndex = this.leftIndex(firstIndex);
            rightIndex = this.rightIndex(firstIndex);
            left = this[leftIndex];
            right = this[rightIndex];
        }
    }
    
    BinaryHeap.prototype.getMinimum = function () {
        this.swap(0, this.length - 1);
        var min = this.pop();
        this.bubbleUp();
        this.bubbleDown();
        return min;
    }

    return BinaryHeap;
})();
