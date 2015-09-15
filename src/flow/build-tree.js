var fnInfo = require('basis.utils.info').fn;

function inspectValue(value, map){
  var sourceInfo = basis.dev.getInfo(value, 'sourceInfo');

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
      value: value
    }];
  }

  var nodes = [];

  if (Array.isArray(sourceInfo.source))
    nodes = [{
      split: true,
      childNodes: sourceInfo.source.map(function(value){
        return {
          childNodes: inspectValue(value, map)
        };
      })
    }]
  else
    nodes = inspectValue(sourceInfo.source, map);

  var fn = sourceInfo.transform;
  var info = fn ? fnInfo(fn) : { source: null };

  nodes.push({
    type: sourceInfo.type,
    events: sourceInfo.events,
    transform: info.getter || info.source,
    value: value.value,
    loc: basis.dev.getInfo(value, 'loc')
  });

  return nodes;
}

module.exports = function buildTree(value){
  var result = inspectValue(value);

  if (result.length)
    result[result.length - 1].initial = true;

  return result;
};
