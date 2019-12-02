$(function() {
  //先获取本地数据 然后动态生成产品
  let shujuarr = k.huoqu("shuju");
  //先定义个空的结构
  let kong = "";
  shujuarr.forEach(e => {
    kong += `<div class="item" data-id="${e.pID}">
    <div class="row">
      <div class="cell col-1 row">
        <div class="cell col-1">
          <input type="checkbox" class="item-ck"${e.isChecked ? "checked" : ""}>
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
          <input autocomplete="off" type="text" class="number fl" value="${e.jia}">
          <a href="javascript:void(0);" class="add fl">+</a>
        </div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="computed">${e.jia * e.price}</em>
      </div>
      <div class="cell col-1">
        <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
      </div>
    </div>
  </div>`;
  });
  $(".item-list").append(kong);

  let no = shujuarr.find(e => {
    return !e.isChecked;
  });
  $(".pick-all").prop("checked", !no);
  if (shujuarr.length != 0) {
    $(".empty-tip ").hide();
    $(".total-of").show();
    $(".cart-header").show();
  }

  //做全选和单选的功能
  //点击全选  单选的都选上 包括更新本地存储的状态
  $(".pick-all").on("click", function() {
    //获取当前的状态
    let zt = $(this).prop("checked");
    //将单选的状态和这个全选的同步
    $(".item-ck").prop("checked", zt);
    $(".pick-all").prop("checked", zt);
    shujuarr.forEach(e => {
      e.isChecked = zt;
    });
    k.cun("shuju", shujuarr);
    jisuan();
  });
  //单选：  单选的长度 和单选都选上的长度一样 那么 就是全选
  //使用事件委托
  $(".item-list").on("click", ".item-ck", function() {
    let dx = $(".item-ck").length === $(".item-ck:checked").length; //这个dx是true和false  将这个赋给全选就好
    $(".pick-all").prop("checked", dx);
    //然后把这个单选的状态 更新到本地存储  刷新后才能正常
    //先获取当前对象的自定义id  （自定义id和pid是一样的 根据这个来找）
    let pid = $(this)
      .parents(".item")
      .attr("data-id");
    //获取当前单选框的状态
    let dqzt = $(this).prop("checked");
    shujuarr.forEach(e => {
      if (e.pID == pid) {
        e.isChecked = dqzt;
      }
    });
    k.cun("shuju", shujuarr);
    jisuan();
  });
  //封装一个计算总价格跟总件数的
  function jisuan() {
    let zongjian = 0;
    let zongjia = 0;
    //当这个单选勾上  为ture  才计算
    shujuarr.forEach(e => {
      if (e.isChecked) {
        zongjia += e.price * e.jia;
        zongjian += e.jia;
      }
    });

    //更新到下栏的价格
    $(".selected").text(zongjian);
    $(".total-money").text(zongjia);
  }
  jisuan(); //要调用一次 才能计算

  //实现加和减
  $('.item-list').on('click','.add',function(){
      //想获取这个add的上一个兄弟
    let p=$(this).prev();
    let shu=p.val();
    
    //每点击一次add（+）  让这个值加1
    p.val(++shu);
   
  //同样也得更新到本地
  //一样也是根据id
  let id =$(this).parents('.item').attr('data-id')
  //遍历找到符合该条件的对象
  let obj =shujuarr.find(e=>{
      return e.pID ==id
  })

  obj.jia=shu;
  //存本地 出现计算
  k.cun('shuju',shujuarr);
  jisuan();
  //存好了  然后计算右边的这个 总计
   $(this).parents('.item').find('.computed').text(obj.price*obj.jia)
})

$('.item-list').on('click','.reduce',function(){
    //想获取这个add的上一个兄弟
  let p=$(this).next();
  let shu=p.val();
  //每点击一次add（+）  让这个值加1
  if(shu <=1){
      alert('不能小于1')
      return;
  }
  p.val(--shu);

//同样也得更新到本地
//一样也是根据id
let id =$(this).parents('.item').attr('data-id')
//遍历找到符合该条件的对象
let obj =shujuarr.find(e=>{
    return e.pID ==id
})
obj.jia=shu;
//存本地 出现计算
k.cun('shuju',shujuarr);
jisuan();
//存好了  然后计算右边的这个 总计
 $(this).parents('.item').find('.computed').text(obj.price*obj.jia)
})

//现在做个效果，可以直接修改这个框内的件数
//当鼠标移进去 就把原来的值保存起来  然后修改这个值，当鼠标失焦的时候  就保当前这个值
$('.item-list').on('focus','.number',function(){
   //保存这个值
   let old =$(this).val();
   //然后给当前的框定义个属性 放这个值
   $(this).attr('data-old',old)
})
//当失焦设置值
$('.item-list').on('blur','.number',function(){
    let xin=$(this).val();
    //如果这个值不是数字 不符合常里，  如果不是 我们得提示并且返回最初的值
    if (xin.trim().length === 0 || isNaN(xin) || parseInt(xin) <= 0) {
        //获取我们刚刚那个old
        let old =$(this).attr('data-old')
        $(this).val(old)
        alert('请输入正确的数字')
        return;
    }
    //如果符合常理的数字  我们就更新到本地  又得拿去数据库的id
     let id= $(this).parents('.item').attr('data-id')
     console.log(id)
     let obj=shujuarr.find(e=>{
         return e.pID ==id
     })

     obj.jia=parseInt(xin)
     k.cun('shuju',shujuarr)
     jisuan();
      $(this).parents('.item').find('.computed').text(obj.price*obj.jia)
   
})






});
