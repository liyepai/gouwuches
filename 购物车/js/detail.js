// $(function() {
//   //每条数据，都是有一个pid的属性  我们可以通过取这个pid后面的数值
//   //之前讲过，在熨斗s下面有个对象location  地址栏上都归他管理
//   //刚刚我们试了一下，地址栏跳转的那个地址,?后面的字符串统称为url
//   //这个url是一个字符串，这里面有我们想要对应的id
//   //   ?id=3   我们只想得到这个3  通过这个substring（4）从第几个字符开始取  没写第二个参数 那么就是直到结束

//   let id = location.search.substring(4);
//   //现在这个id是没有的  我们去遍历这个数据的数组，取他里面的pID后面从第4位到结束数值
//   phoneData.forEach(function(e) {
//     //这里的e.pid是一个值 是一个数字
//     if (e.pID == id) {
//       console.log(e.pID); //一样的
//       console.log(id); //一样的
//       //然后把原来的价格 图片路径 名字  统统换成当前对象e的价格...
//       $(".summary-price em").text(`￥${e.price}`);
//       $(".preview-img  img").attr("src", e.imgSrc);
//       $(".sku-name").text(e.name);
//     }
//   });

//   //    console.log(id)  这里已经单纯的拿到这个id了、、
//   //然后  我们打开这个产品详情（当前这个页面） 找到需要修改的属性标签
//   //通过jq方法来找 修改
// });
//方法二
$(function() {
  //获取选购页面点击进去跳转页面的地址栏后面的url（也就是？）的字符串，然后通过方法取出这个数字值  我们数组的pid  里面也是一个id  我们要通过这个id与数据数组的pid做匹配
  //从地址栏的这个search属性中获取到的字符串  从这串字符串的第四个字符起  取到结束
  let id = location.search.substring(4);
  // 讲解一个新的数组的获取指定条件元素的方法
  let idd = phoneData.find(function(e) {
    //得返回一个条件
    return e.pID == id;
  });
  $(".summary-price em").text(`￥${idd.price}`);
  $(".sku-name").text(idd.name);
  $(".preview-img>img").attr("src", idd.imgSrc);

  //做一个加入购物车效果，点击购物车  先注册事件
  $(".addshopcar").on("click", function() {
    let jian = $(".choose-number").val();
    //现在获取到这个值了，但是 我们得保证用户  输入的值 不能是空字符 不能是零吧，不能是负数把，不能是字符串把  这些都是不合理的
    //  所有我们得判断  如果是不合理的值  我们就终止  提示他输入正确的值
    //trim这个方法取掉头尾空格  如果都是空格 自然就没长度
    //isNaN（jian）判断这个键  这个解释有点绕啊
    //如果这个值整数小于或等于0，   都是不行的
    if (jian.trim().length === 0 || isNaN(jian) || parseInt(jian) <= 0) {
      alert("请输入正确的值");
      return;
    }

    let arr = k.bdsj("gwc");
    //获取加入购物车的那个件数的值
    //现在已经能实现存到本地了  但是，比如这个这个手机，之前已经有存过这款的，我们想多买几支，应该是这个件数增加，而不是每一只手机一条数据
    //所有我们要判断下  这个编号（id）的手机是不是在数据库了  有就这个件数累加就好
    //取出这个当前数组的id
    //这个返回的是一个条件
    let did = arr.find(function(e) {
      return e.pID == id;
    });
    // 为了保证数量是数字，需要把数量先转换为数字
    jian = parseInt(jian); //如果不转成数字，那么他是字符串  是链接起来了  例如  1+1= 11  我们想要的是2

    //判断下，如果这个did成立（证明这个id已经有了  那么让他的件数增加就好）
    //这个did也是一个对象  和那些对象一样 有这同样的属性
    if (did) {
      did.jian += jian;
    } else {
      //现在数组有了，我们就创建一个对象  把我们数据里的 属性和值放进去，然后再丢给本地存储
      let ob = {
        pID: idd.pID,
        name: idd.name,
        imgSrc: idd.imgSrc,
        price: idd.price,
        //写到这里，发觉我们还有一个属性，件数    我们先在外面获取件数的值
        jian: jian ,//件数
          // 保持勾选的状态的属性
        shifou:true
      };
      //把这个数据对象放到数组里面  和微博那个一样
      arr.push(ob);
    }
    k.cun("gwc", arr); //现在  如果想买10部手机，他本地生成的数据不是10条，  而已一条  里面的jian（件数）为10
    location.href = "./cart.html"; //这一步是最后一步  这个是地址的跳转 跳转到购物车的页面，可以看到想要购买的商品
    //现在去这个页面 把我们本地的数据取出来展示出来
  });
});
//到这里  我们一般是要把这个arr转换json格式的字符串  然后通过方法  放进去本地存储
//现在去k里面  封装一个函数
//已经封装好了  看看能不能调用
//   k.cun(Key,date);

//每买一次  跳转一次
//js里面的路劲要相对于引用他的html页面来说的
