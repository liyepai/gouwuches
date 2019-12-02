// var a = 20;
// alert(a);


// -- 使用一个自调用函数，形成一个局部作用域，把我们自己的变量保护起来
(function(){
  var a = 20;
  alert(a);
})();