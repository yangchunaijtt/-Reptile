/**
 * fliggy.js：分析飞猪网站的返回数据
 */



const cheerio = require('cheerio');


// 返回的数据
let allElm = "";    // ajax获取到的所有数据
let fliggyData = []; // 返回首页的数据


module.exports = {
  handele(res){
    let fliggyData = fliggyHandle(res);
    return fliggyData;
  }
};

// 处理获取到的飞猪数据
function fliggyHandle(res){
  let name = "";      // 名称
  let price = 0;      // 价格
  let type  = "";     //标签/类型
  let time = 0;       // 团期
  let supplier = ""; //供应商
  let score = "";    // 评分/满意度
  let people = 0;    // 多少人出游
  let img = "";  // 图片地址
  let data = {};    // 返回的data数据
  allElm = res;
  
  let $ = cheerio.load(res.text);
  
  // 找到目标数据所在的页面元素，获取数据
   
  if ( $('div#J_Page #content .page-products-block  .page-products-block-left .product-list-wrap div').children(".product-wrap").first() ) {
    $('div#J_Page #content .page-products-block  .page-products-block-left .product-list-wrap div').children(".product-wrap").first().each((idx,ele) => {
       
        // 目前就获取第一条的第一个数据
        type = $(ele).find(".product-left").find(".tag-value").text().trim(); // 获取类型
        name  = $(ele).find(".product-middle").find(".main-title").text().trim(); // .f_0053aa  .children().filter(".f_0053aa")
        price =parseFloat($(ele).find(".product-right").find(".real-price").find(".price").text().split("￥")[1]);
       
       
        people   = $(ele).find(".product-middle").find(".rate-msg").children("span").first().text().trim();
        
        img =  $(ele).find(".product-left").find(".main-img").find("img").attr("data-src");
        data = {
          company:"飞猪",
          push:[
            {
              name:name,
              price:price,
              // people:people,
              time:"",
              type:type,
              img:img,
            }
          ]
          
        }
      });
  }
  
  return data;
}








 



