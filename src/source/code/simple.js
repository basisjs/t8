var Value = require('basis.data').Value;
var expression = require('basis.data.value').expression;
var cell = function(value){
  return new Value({ value:value });
};

var a = cell(3).as(function(x){ return x * x + 1 });
var b = cell(2);
var sum = expression(a, b, function(a, b){
  return a + b;
});

module.exports = sum;
