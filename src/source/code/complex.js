var DataObject = require('basis.data').Object;
var Value = require('basis.data').Value;
var Expression = require('basis.data.value').Expression;

var foo = new DataObject({ data: { x: 1 } });
var bar = new DataObject({ delegate: foo });
var baz = new DataObject({ data: { y: 2 } });
var v1 = Value.from(bar, 'delegateChanged', 'delegate');
var v2 = v1
  .pipe('update', 'data.x')
  .compute('update', function(object, val){
    return object.data.y + val;
  })(baz)
  .as(function(x){
    return x + x;
  });

module.exports = new Expression(v2, v1.pipe('update', 'data.x'), v1.as(basis.getter('basisObjectId')), function(a, b, c){
  return a + b + c;
});
