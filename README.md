QinJs
=====
[![Build Status](https://travis-ci.org/elrrrrrrr/qinjs.svg?branch=master)](https://travis-ci.org/elrrrrrrr/qinjs)
这是什么
----------
这是一个非常轻量级的js库、目的是实现手机端(webkit)的jquery、zepto free 。
这个库一共只有80余行代码，gzip之后不到1kb，最大程度减少带宽。
如果你只需要实现简单的交互，这是一个不错的解决方案。

###扩展性

考虑到需求复杂化，所有的API都可以无缝衔接到Zepto/Jquery

###选择器
```js
$('div')
```
###绑定器
```js
$('div').on('click',function(){
		//do something
	})
```
###css渲染
```js
$('div').css('display','none')
```
###支持线性调用
```js
$('div').css('display','none')
		.css('display','block')
```
	

