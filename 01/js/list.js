$(function(){
//定义个空的字符串，等等丢到循环里面   然后在循环结构外把他生成  手动添加append
let sc =``;//这里要用``  如果不用会出现undefined


//遍历这个数据 取数据  让他自动生成


//注意，這裡要用forEach遍歷，而不是each.注意看下这个data。js里面的这个phoneData  他是一般的数组[]
phoneData.forEach(function(e){
    //每遍历一次   把当前这次赋给sc  然后结构外通过父元素来手动添加了
    //让他每次生成的数据都根据数据的数据来生成  所以里面的关键变量是不一样的
    //例如产品名字  价格。。。。
    //一定要用e  例如  循环到第一个  拿到第一个的数据与数据结构
    //赋值给sc   然后 $('.goods-list >ul').append(sc)
    sc+=`
    <li class="goods-list-item">
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
  </li>`;
//   console.log(e.pID)
})
//   $('.goods-list >ul').append(‘html’)   这里可以直接添加具有html格式的字符串
//上面每遍历一次  就添加一次
// 给ul添加子元素，这个sc的格式是上面生成的这个： 是一个li标签里面包含各种结构
 $('.goods-list >ul').append(sc)
})