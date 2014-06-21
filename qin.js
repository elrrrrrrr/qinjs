/*globals Node:true, NodeList:true*/
$ = (function (document, window, $) {
  
  var node = Node.prototype,
      trigger = 'trigger',
      // note: createElement requires a string in Firefox
      dummy = document.createElement('i');

  NodeList.prototype.forEach = [].forEach
  // we have to explicitly add a window.on as it's not included
  // in the Node object.
  window.on = Node.prototype.on = function (event, fn) {
    this.addEventListener(event, fn, false);

    return this;
  };

  NodeList.prototype.on = function (event, fn) {
    this[forEach](function (el) {
      el.on(event, fn);
    });
    return this;
  };

  Node.prototype.css = function(k,v){
    var self = this;
    typeof k != 'object' ? this.style[k] = v : (function(k){
      for (var i in k) {
        self.css(i,k[i])
      }
    })(k)
    return this ;
  }

  NodeList.prototype.css = function(k,v){
    this.forEach(
      function(el){
        el.css(k,v)
      }
    )
    return this;
  }
  // we save a few bytes (but none really in compression)
  // by using [trigger] - really it's for consistency in the
  // source code.
  window[trigger] = Node.prototype[trigger] = function (type, data) {
    // construct an HTML event. This could have
    // been a real custom event
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
  };

  NodeList.prototype[trigger] = function (event) {
    this[forEach](function (el) {
      el[trigger](event);
    });
    return this;
  };

  $ = function (s) {
    
    var r = document.querySelectorAll(s || '☺'),
        length = r.length;
    
    return length == 1 ? r[0] : r;
  };

  $.test = function(){
    alert('test')
  }
  
  $.on = Node.prototype.on.bind(dummy);
  $[trigger] = Node.prototype[trigger].bind(dummy);

  return $;
})(document, this);