//获取本地数据
var k = {};
k.randomInt = function(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
};
k.bdsj = function(key) {
  let json = localStorage.getItem(key);
  let arr;
  if (json === null) {
    arr = [];
  } else {
    arr = JSON.parse(json);
    //这里没有return  没返回  等等是调用不到这个arr的
  }
  return arr;
//    arr = json === null ? [] : JSON.parse(json);
//     return arr;
};

//key:是本地存储的数据名，data是数据
k.cun = function(key, data) {
  //将数据转换成json格式的字符串
  let json = JSON.stringify(data);
  //然后再通过方法  存到本地存储
  localStorage.setItem(key, json);
};
