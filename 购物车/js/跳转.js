// $(function(){
//     //我们要通过获取产品也所跳转的id（地址栏上的那个id）  来找对应data数据组里的pID属性   一一对应
//     //获取地址栏上的url字符串（指的是？后面的字符串）  获得字符串  通过一个方法 取出数值（pID里面的值只是数字）
//     let id=location.search.substring(4);//从第四位开始到结束 
//     //通过遍历寻找 通过判断这个地址栏上数值id是否和我们数据组里面的pid是不是一样 如果一样那么就修改当前那个对象的数据
//     // phoneData.forEach(function(e){
//     //     if(e.pID == id){
//     //        $('.summary-price em').text(`￥${e.price}`);  
//     //        $('.sku-name').text(`￥${e.name}`);  
//     //        $('.preview-img img').attr('src',e.imgSrc);  

//     //     }
//     // })

//     //方法二： 通过一个方法  返回值的是一个条件  find
//      let fh=phoneData.find(function(e){
//        return e.pID == id;
//      })
//      $(".summary-price em").text(`￥${fh.price}`)
// $('.sku-name').text(fh.name)
// $('.preview-img>img').attr('src',fh.imgSrc);


// })