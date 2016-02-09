// var fnInfo = require('basis.utils.info').fn;
var fnInfo = require('devpanel').inspectBasis.require('basis.utils.info').fn;

function inspectValue(value, resolver, map){
  var sourceInfo = resolver(value, 'sourceInfo');

  if (!map)
    map = [];

  if (!sourceInfo)
  {
    var marker = map.indexOf(value) + 1;

    if (!marker)
      marker = map.push(value);

    return [{
      source: true,
      marker: marker,
      value: value,
      loc: resolver(value, 'loc')
    }];
  }

  var nodes = [];

  if (Array.isArray(sourceInfo.source))
    nodes = [{
      split: true,
      childNodes: sourceInfo.source.map(function(value){
        return {
          childNodes: inspectValue(value, resolver, map)
        };
      })
    }];
  else
    nodes = inspectValue(sourceInfo.source, resolver, map);

  var fn = sourceInfo.transform;
  var info = fn ? fnInfo(fn) : { source: null };

  nodes.push({
    type: sourceInfo.type,
    events: sourceInfo.events,
    transform: info.getter || info.source,
    value: value.value,
    loc: resolver(value, 'loc')
  });

  return nodes;
}

module.exports = function buildTree(value, resolver){
  var result = inspectValue(value, resolver || basis.dev.getInfo);

  if (result.length)
    result[result.length - 1].initial = true;

  return result;
};
