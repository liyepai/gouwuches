$(function() {
//这是一个想购买的产品页清单
//我们要从本地存储里 取出来  动态生成出
//获取数组
let arr=fz.qu('shuju');
let cp='';
//遍历动态生成
arr.forEach(function(e){
 cp+=`<div class="item" data-id="${e.pID}">
 <div class="row">
   <div class="cell col-1 row">
     <div class="cell col-1">
       <input type="checkbox" class="item-ck" ${e.isChecked ? "checked" : ''}>
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
       <input autocomplete="off" type="text" class="number fl" value="${e.jianshu}">
       <a href="javascript:void(0);" class="add fl">+</a>
     </div>
   </div>
   <div class="cell col-1 tc lh70">
     <span>￥</span>
     <em class="computed">${e.jianshu *e.price}</em>
   </div>
   <div class="cell col-1">
     <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
   </div>
 </div>
</div>`
})
//生成在页面
$('.item-list').append(cp)

//如果这个本地存储有数据的话  
if(arr.length !=0){
 $('.empty-tip').hide();
 $('.cart-header').show();
 $('.total-of ').show();
}

 //第二个功能 全选和点选
 $('.pick-all').on('click',function(){
     let zt=$(this).prop('checked');
     $('.item-ck').prop('checked',zt)
     $('.pick-all').prop('checked',zt)

     //然后修改本地数据的状态
     arr.forEach(e=>{
         e.isChecked =zt;
     })
     //重新存本地
     fz.cun('shuju',arr)
 })
});
 