/**
 * 需要浏览器支持HTML node对象及querySelect方法
 * @param  {[document]} document [document对象]
 * @param  {[window]} window   [window对象]
 */
;
(function(document, window) {

  var node = Node.prototype,
    trigger = 'trigger',
    // 兼容firefox, firefox下创建元素需要一个字符串作为参数
    dummy = document.createElement('i');
  //为nodeList添加遍历方法
  NodeList.prototype.forEach = [].forEach
  //为node对象添加on方法 
  window.on = Node.prototype.on = function(event, fn) {
    this.addEventListener(event, fn, false);
    return this;
  };

  //nodeList遍历添加
  NodeList.prototype.on = function(event, fn) {
    this.forEach(function(el) {
      el.on(event, fn);
    });
    return this;
  };
  //封装node style属性
  Node.prototype.css = function(k, v) {
    var self = this;
    typeof k != 'object' ? this.style[k] = v : (function(k) {
      for (var i in k) {
        self.css(i, k[i])
      }
    })(k)
    return this;
  }
  //同理递归实现
  NodeList.prototype.css = function(k, v) {
    this.forEach(
      function(el) {
        el.css(k, v)
      }
    )
    return this;
  }
  //添加自定义事件支持
  window[trigger] = Node.prototype[trigger] = function(type, data) {
    //模拟事件
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    //触发事件
    this.dispatchEvent(event);
    //链式调用
    return this;
  };
  //遍历调用
  NodeList.prototype[trigger] = function(event) {
    this.forEach(function(el) {
      el[trigger](event);
    });
    return this;
  };

  //创建实例 s 为选择器元素
  var entry = function(s) {
    //获取node对象
    var r = document.querySelectorAll(s || 'body'),
      length = r.length;
    //单个元素直接返回,多个元素返回nodeList
    return length == 1 ? r[0] : r;
  };

  //获取node.on(),重新指定作用域,完成自定义事件支持  
  entry.on = Node.prototype.on;

  entry[trigger] = Node.prototype[trigger];

  //模块化
  if (typeof exports !== 'undefined' && module.exports) {
    module.exports = exports = entry;
  } else if (typeof define === 'function' && define.cmd) {
    define(function(require, exports, module) {
      module.exports = exports = entry;
    })
  } else if (typeof define === 'function' && define.amd) {
    define('$', [], entry);
  } else {
    //浏览器端直接运行
    window.$ = entry;
  }

})(document, window);