var chai = require('chai');
var run = require('../src/runner.js');
var Block = require('../src/blocks.js');

describe('Array', function() {
    it('simple 3x3 test', function() {
        var first =[
            [new Block(1,0,0),new Block(2,0,1),new Block(3,0,2)],
            [new Block(4,1,0),new Block(5,1,1),new Block(6,1,2)],
            [new Block(0,2,0),new Block(7,2,1),new Block(8,2,2)]
        ];
      var result = run(8,first);
      chai.assert.equal(2,result.count);
      chai.assert.deepEqual(['left','left'],result.steps);
    });
    it('complex 3x3 test', function() {
        var second =[
          [new Block(2,0,0),new Block(1,0,1),new Block(8,0,2)],
          [new Block(7,1,0),new Block(3,1,1),new Block(4,1,2)],
          [new Block(5,2,0),new Block(0,2,1),new Block(6,2,2)]
      ];
      var expected = ['left','right','up','right','left','left','up','right','up','down','down','down','left'];
      var result = run(8,second);
      chai.assert.equal(13,result.count);
      chai.assert.deepEqual(expected,result.steps);
    });
    it('4x4 test', function() {
        var third =[
          [new Block(1,0,0),new Block(6,0,1),new Block(5,0,2),new Block(12,0,3)],
          [new Block(10,1,0),new Block(0,1,1),new Block(3,1,2),new Block(4,1,3)],
          [new Block(14,2,0),new Block(7,2,1),new Block(8,2,2),new Block(2,2,3)],
          [new Block(9,3,0),new Block(13,3,1),new Block(11,3,2),new Block(15,3,3)]
      ];
      var expected = ['up','up','left','left','up','up','down','left','left','down','up','right','up','right','up','down','right','up',
      'down','down','left','down','right','left'];
      var result = run(15,third);
      chai.assert.equal(24,result.count);
      chai.assert.deepEqual(expected,result.steps);
    });
    it('5x5 test', function() {
        var forth =[
          [new Block(7,0,0),new Block(18,0,1),new Block(6,0,2),new Block(4,0,3),new Block(5,0,4)],
          [new Block(2,1,0),new Block(14,1,1),new Block(1,1,2),new Block(12,1,3),new Block(10,1,4)],
          [new Block(11,2,0),new Block(0,2,1),new Block(8,2,2),new Block(17,2,3),new Block(15,2,4)],
          [new Block(23,3,0),new Block(22,3,1),new Block(9,3,2),new Block(21,3,3),new Block(19,3,4)],
          [new Block(16,4,0),new Block(3,4,1),new Block(24,4,2),new Block(13,4,3),new Block(20,4,4)]
      ];
      var expected = ["up","left","left","up","right","up","up","up","up","right","down",
     "left","left","down","right","up","up","up","right","down","left","left","up","up","left",
     "down","right","right","up","down","left","left","down","down","down","right","left","up",
     "down","left","left","left","down","down","right","right","right"];
      var result = run(24,forth);
      chai.assert.equal(47,result.count);
      chai.assert.deepEqual(expected,result.steps);
    });
});