var chai = require('chai');
var run = require('../src/runner.js');

describe('Array', function() {
    it('simple 3x3 test', function() {
      var steps = [">>_<<",">_><<","><>_<","><><_","><_<>","_<><>","<_><>","<<>_>","<<_>>"]
      var result = run(2);
      console.log(result);
      chai.assert.deepEqual(steps,result);
    });
});