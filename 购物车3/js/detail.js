$(function() {
  //先获取url栏上的字符串  通过方法取id后面的数字  ?id=1
  //url栏是从问号开始
  let id = location.search.substring(4);
  //从这个数据里面 获取 和我们url上面的id对应的数据
  //定义这个变量  代表符合这个条件的
  let tiaojian = phoneData.find(e => {
    return e.pID == id; //注意这个是两个等号  如果用三个等号  他们就不相等了
  });
  //通过这个条件  代表着 他的对象 可以调用它的任何对象
  // $('.summary-price em').text(`￥${tiaojian.price}`)
  $(".summary-price em").text(`¥${tiaojian.price}`);
  $(".sku-name").text(`${tiaojian.name}`);
  $(".preview-img img").attr("src", tiaojian.imgSrc); //注意  这里是重新设置 img的src属性

  //点击购物车 将数据存到本地
  $(".addshopcar").on("click", function(e) {
    //获取这个件数框的值
    let jianshu = $(".choose-number").val();
    //做个合理判断
    if (
      jianshu.trim().length === 0 ||
      isNaN(jianshu) ||
      parseInt(jianshu) <= 0
    ) {
      alert("请输入正确的数字");
      return;
    }
    //从本地获取数据
    let arr = fz.qu('shuju');

    //找出对于的id
    let heshi = arr.find(function(e) {
      return e.pID == id;
    });

    //先确保这个件数是数字
    jianshu = parseInt(jianshu);
    if (heshi) {
      //如果满足这个条件
      e.jianshu += jianshu;
    } else {
      //如果不满足就重新创建一个对象
      let obj = {
        pID: tiaojian.pID,
        imgSrc: tiaojian.imgSrc,
        name: tiaojian.name,
        price: tiaojian.price,
        // 件数要从输入框里面获取
        jianshu: jianshu,
        // 保持勾选的状态的属性
        isChecked: true
      };
      arr.push(obj);
    }
    fz.cun('shuju', arr);

    //将数据放到数组里  然后存本地
  location.href = "./cart.html";

  
  });
});
