$(function() {
  //这里已经能拿到本地存储的数据了   现在把他展示出来
  // console.log(localStorage.getItem('gwc'))
  //先用数组  把字符串取出来
  let arr = k.bdsj("gwc");
  // console.log(arr)
  //先定个空的
  let lis = ``;
  //遍历这个数组  让每条数据赋值  手动添加li
  arr.forEach(function(e) {
    lis += `<div class="item" data-id="${e.pID}">
  <div class="row">
    <div class="cell col-1 row">
      <div class="cell col-1">
        <input type="checkbox" class="item-ck" ${e.shifou ? "checked" : ""}>
      </div>                                    
      <div class="cell col-4">
        <img src="${e.imgSrc}" alt="">
      </div>
    </div>
    <div class="cell col-4 row">
      <div class="item-name">${e.name}</div>
    </div>
    <div class="cell col-1 tc lh70">
      <span>￥</span>
      <em class="price">${e.price}</em>
    </div>
    <div class="cell col-1 tc lh70">
      <div class="item-count">
        <a href="javascript:void(0);" class="reduce fl ">-</a>
        <input autocomplete="off" type="text" class="number fl" value="1">
        <a href="javascript:void(0);" class="add fl">+</a>
      </div>
    </div>
    <div class="cell col-1 tc lh70">
      <span>￥</span>
      <em class="computed">${e.jian * e.price}</em>
    </div>
    <div class="cell col-1">
      <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
    </div>
  </div>
</div>`;
  });
  $(".item-list").append(lis);

  //到这里  已经可以把页面展示出来了  但是   效果不对，如果有数据出来
  //这个购物空空如也   是需隐藏 换成 表单和标题显示出来的
  //如果这个本地数组的长度为0  证明他是没有数据的  没有数据就不会生成 不会生成就展示不出来
  //展示不出来就提醒你去购物 这个购物车空空如也才显示
  //这样  如果没有数据 他这个就显示 有数据  他就隐藏 表单和表头显示
  if (arr.length != 0) {
    $(".empty-tip").hide();
    $(".cart-header ").show();
    $(".total-of").show();
  }
  //

  let noCkall = arr.find(function(e) {
    return e.shifou === false;
  });
  //现在做这个全选和点选，如果点上全选：表头和表底和单选这些都勾上
  //全选：
  $(".pick-all").on("click", function() {
    //获取当前当前的状态  prop是开关属性  true false
    let zt = $(this).prop("checked"); // console.log(zt)获取到了
    //如果勾上来  让全部的选项和这个zt一样
    $(".item-ck").prop("checked", zt);
    $(".pick-all").prop("checked", zt);

    arr.forEach(function(e) {
      e.shifou = zt;
    });

    //存到本地
    k.cun("gwc", arr);
  });
  //已做好全选
  //做单选  如果都点上了  那么全选自然是选上否则不是
  //和之前那个差不多 获取选择的长度  与  获取到单选框的长度是不是一样  一样证明选上了  全选也选上

  //所有的点选框都是动态生成的  如果我们直接循环来操作删除，那么 他就遍历不到后面新加入的数据  所有  我们委托他父类  来操作
  //注意 我们是所有单选框的父类级别的人物  不能是单个的父亲
  //参数的第一个：类型，第二个：要删除的子类，第三个 函数
  $(".item-list").on("click", ".item-ck", function() {
    //如果，长度一样
    let quan = $(".item-ck").length === $("e.item-ck:checked").length;
    //这个返回的是 true  与 false
    //将全选的状态改下  找到全选的那个设置
    $(".pick-all").prop("checked", quan);
    //在点选的同时  也要求修改本地存储中的状态
    //通过取得当前这个单选框的id  到本地存储中 根据这个id  来寻找匹配一样的
    //如果一样 就修改这个勾选的状态
    //注意，当前这个this是单选框   看了下 只有这个item父类级别有id
    let iddd = $(this)
      .parents(".item")
      .attr("data-id");
    // console.log(iddd);取到了
    //获取当前勾选的状态 等等丢给本地存储中的数据状态
    let danqian = $(this).prop("checked");
    //接着 变量下数组  找到和这个iddd匹配的epid
    //注意这个iddd是字符串  我们在判断的时候 不能用===  三个等于就连同他的类型都比较了
    arr.forEach(function(e) {
      if (e.pID == iddd) {
        //如果等于，那么改这个勾选状态
        e.shifou = danqian;
      }
    }); //更新到本地
    k.cun("gwc", arr);
  });

  // ${e.shifou ? 'checked': ''}  这个上面的三元表达式  如果为true  返回 checked（默认勾上）  否则 ‘ ’ 为false（没有勾上）

  //第三个功能 计算总价和总件数

  function jisuan() {
    let zongjian = 0;
    let zongjia = 0;
    arr.forEach(function(e) {
      if (e.shifou) {
        //这个是单选款  如果点到这个单选框
        zongjian += e.jian; //把点到的全部 遍历  累加
        zongjia += e.jian * e.price;
      }
    });

    $(".total-money").text(zongjia);
    $(".selected").text(zongjian);
  }
  jisuan();
  //需要马上调用计算

  //实现加减：
  //分卡做  做加的先
  //同样也得做事件委托
  $(".item-list").on("click", ".add", function() {
    //prve  这个是获取当前元素的上一个兄弟元素,也就是这个计件的宽
    //先获取计件狂
    let prev = $(this).prev();
    let jianzi = prev.val();
    //每点击一次++
    prev.val(++jianzi);
    //数量也需要和本地的同步
    //先找到id
    let id = $(this)
      .parents(".item")
      .attr("data-id");
    //定义一个暂时的对象等等可以调用
    let obj = arr.find(function(e) {
      return e.pID == id;
    });
    obj.jian = jianzi;
    //然后又得及时存到本地
    k.cun("gwc", arr);
    //更新总件和总价
    jisuan();
    //更新右边的价格
    $(this)
      .parents(".item")
      .find(".computed")
      .text(obj.jian * obj.price);
  });

  //减的也是同样  把该换的换了
  $(".item-list").on("click", ".reduce", function() {
    //prve  这个是获取当前元素的上一个兄弟元素,也就是这个计件的宽
    //先获取计件狂
    let next = $(this).next();
    let jianzi = next.val();
    //要做下判断，要符合常理
    if (jianzi <= 1) {
      alert("不能为0");
      return;
    }
    //每点击一次++
    next.val(--jianzi);
    //数量也需要和本地的同步
    //先找到id
    let id = $(this)
      .parents(".item")
      .attr("data-id");
    //定义一个暂时的对象等等可以调用
    let obj = arr.find(function(e) {
      return e.pID == id;
    });
    obj.jian = jianzi;
    //然后又得及时存到本地
    k.cun("gwc", arr);
    //更新总件和总价
    jisuan();
    //更新右边的价格
    $(this)
      .parents(".item")
      .find(".computed")
      .text(obj.jian * obj.price);
  });


  //现在对这个框内的值进行同步
  //我们先把这个框内的值保存起来，当用户输入错误时，让他恢复到原来的值
  //当鼠标点进去获得焦点时，把值给保存起来
  $('.item-list').on('focus','.number',function(){
      //获取当前的值 然后用个变量保存起来  再用个自由属性放进去
      let old =$(this).val();
      $(this).attr('data-old',old);

  });
  //当我们手动设置完这个是 鼠标失焦时，把这个合理的数据保留起来  
  //合理的数据指的是：数字不能是字母 负数 0
  $('.item-list').on('blur','.number',function(){
     let hh=$(this).val();
     if (hh.trim().length === 0 || isNaN(hh) || parseInt(hh) <= 0) {
        //现在拿不到那个旧的，我们刚刚定义data-old这时候可以起到作用了
        let o=$(this).attr('data-old')
        //让当前的val=lod的值
        $(this).val(o);   
        alert('请输入阿拉伯数字');
        return;
      }
       //假如，这个值设置成功了，那么 所有相关的数据就要重新设置 然后存进去本地
      let id=$(this).parents('.item').attr('data-id');
      console.log(id)
      let obj = arr.find(e=>{
        return e.pID == id;
      });
    
        //将这个字符串的数字转换成整数
        obj.jian=parseInt(hh);
       //存进去本地 jishuan
       k.cun('gwc',arr);
       jisuan();
       //更新右边的价格
       $(this).parents('.item').find('.computed').text(obj.jian * obj.price);

  })
  //

  


});
