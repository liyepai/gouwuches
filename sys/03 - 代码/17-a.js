// var a = 10;

// alert(a);

// // 点击div有效果
// var div = document.querySelector('.box');
// div.onclick = function(){
//   alert(a);
// }

// ---- 上面是变量污染的代码

// --- 使用自调用函数实现避免变量污染
(function(){
  var a = 10;
  alert(10);

  // 点击div有效果
  var div = document.querySelector('.box');
  div.onclick = function(){
    alert(a);
  }
})();