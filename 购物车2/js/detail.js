$(function() {
  //这是一个产品页的产品  跳转到这里
  //我们可以通过url地址栏上来  有个 id=。。。
  //我们可以通过location。search.substring(4);
  //location.search这个可以获取url的字符串  substring这个方法可以获取一串字符串从哪里到哪里把他取出来
  let id = location.search.substring(4); //从第四个字符开始到结束 取出来。
  //我们id号来调用这个数据数组pID  如果这个url后面这个id跟这个pID相对  那么我们就返回这整个对象，我们再通过选择器来修改里面的图片价格看
  let t = phoneData.find(function(e) {
    return e.pID == id;
  });
  //分别设置点击跳转的那个产品的各种数据
  $(".summary-price em ").text(`￥${t.price}`);
  $(".preview-img img").attr("src", t.imgSrc);
  $(".sku-name").text(`${t.name}`);

  //做点击加入购物车
  $(".addshopcar").on("click", function() {
    let jia = $(".choose-number").val();
    //判断这个值，要合情合理
    if (jia.trim().length === 0 || isNaN(jia) || parseInt(jia) <= 0) {
      alert("请输入正确的");
      return;
    }
    let arr = k.huoqu("shuju"); //现在每点一下 都有一个数组了
    let e = arr.find(e => {
      return e.pID == id;
    });
    jia = parseInt(jia);
    //判断这个条数据里面有没有存在 有就叠加  没有就创建
    if (e) {
      e.jia += jia;
    } else {
      //没有就创建
      let obj = {
        pID: t.pID,
        name: t.name,
        imgSrc: t.imgSrc,
        price: t.price,
        //还要把件数加进去
        jia: jia,
        isChecked: true
      };
      arr.push(obj);
    }
    k.cun("shuju", arr);
    location.href = "./cart.html"; //js里面的路劲要相对于引用他的html页面来说的
  });
});
