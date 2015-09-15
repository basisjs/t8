var router = require('basis.router');
var base64 = require('basis.utils.base64');
var getSource = require('basis.utils.source').getSource;

var routerSource = router.route(/(.*)/).param(0).as(function(value){
  return value
    ? base64.decode(value, true)
    : getSource(asset('./code/simple.js'));
});

routerSource.attach(function(value){
  router.navigate(base64.encode(String(value), true));
});


var sourceValue = routerSource.as(function(source){
  try {
    var fn = new Function('exports,module,basis,global,__filename,__dirname,resource,require,asset', source);
    var module = {
      exports: {}
    };

    fn(module.exports, module, basis, global, '', '', resource, require, asset);

    return module.exports;
  } catch(e) {
    console.error(e);
  }
});

module.exports = {
  source: routerSource,
  value: sourceValue
}
