module.exports = require('basis.app').create({
  init: function(){
    var Value = require('basis.data').Value;
    var Node = require('basis.ui').Node;
    var Flow = require('./flow/index.js');
    var source = require('./source/index.js').source;
    var value = require('./source/index.js').value;

    var flow = new Flow();

    Value
      .from(value.as(Flow.buildTree))
      .link(flow, flow.setChildNodes);

    return new Node({
      template: resource('./template/layout.tmpl'),
      binding: {
        flow: flow,
        source: source
      },
      action: {
        input: function(e){
          source.set(e.target.value);
        }
      }
    });
  }
});
