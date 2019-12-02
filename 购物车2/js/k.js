let k={};
//这个js文件是封装一些本地存储的函数的
k.randomInt = function (n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
  }

//获取本地存储的数据：
k.huoqu=function(key){
//先获取到
let json=localStorage.getItem(key);
//如果本地存储没有  
let arr;
if(json===null){
   arr=[];
}else{
    arr=JSON.parse(json);
}
return arr;//记得返回个数组 不然等等调用不到
}

k.cun=function(key,data){
//将data数据  转换成json格式的  然后通过方法存进去
    let json=    JSON.stringify(data);
    localStorage.setItem(key,json)
}