let fz = {};
//这个js文件是封装一些本地存储的函数的
fz.randomInt = function(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
};

//封装一个取本地数据的方法
fz.qu = function(key) {
  let qushuju = localStorage.getItem(key);
  //平常我们去到的数据  他是字符串来的 我们得创建一个数组来存 所有我们得反过来转换
    // let arr;
    // if(qushuju === null){
    //   arr=[];
    // } else{
    //     arr=JSON.parse(qushuju)
    // }
    // arr = qushuju === null ? [] : JSON.parse(qushuju);
    return JSON.parse(qushuju) || [];
};
//存进去本地
fz.cun = function(ming, shuju) {
  //将shuju转换成json格式的  然后存
  let json = JSON.stringify(shuju);
  localStorage.setItem(ming, json);
};
