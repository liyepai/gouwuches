$(function(){

//先准备一个空的对象  等等遍历这个数据的时候  将每个数据给他 然后在外面添加
let sc=``;
phoneData.forEach(function(e){
    sc+=`<li class="goods-list-item">
    <a href="detail.html?id=${e.pID}">
      <div class="item-img">
        <img src="${e.imgSrc}" alt="">
      </div>
      <div class="item-title">${e.name}</div>
      <div class="item-price">
        <span class="now">¥${e.price}</span>
      </div>
      <div class="sold">
        <span> 已售 <em>${e.percent}% </em></span>
        <div class="scroll">
          <div class="per" style="width:${e.percent}%"></div>
        </div>
        <span>剩余<i>${e.left}</i>件</span>
      </div>
    </a>
    <a href="#" class="buy">
      查看详情
    </a>
  </li>`
})

//找正确的父类 给添加li
$('.goods-list>ul').append(sc);

//现在已经可以自动生成多个li了












})