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
  let data = [{isOK:false}];    // 返回的data数据
  allElm = res;
  // console.log("飞猪数据类型",typeof res);
  let $ = cheerio.load(res.text);
  
  // 找到目标数据所在的页面元素，获取数据
  // console.log("飞猪DOM",$('div#J_Page #content .page-products-block .page-products-block-left .product-list-wrap') == false); //   
  if ( $('div#J_Page #content .page-products-block  .page-products-block-left .product-list-wrap div').children(".product-wrap").first() ) {
    $('div#J_Page #content .page-products-block  .page-products-block-left .product-list-wrap div').children(".product-wrap").first().each((idx,ele) => {
        // console.log("",$(ele).text());
        // 目前就获取第一条的第一个数据
        type = $(ele).find(".product-left").find(".tag-value").text().trim(); // 获取类型
        name  = $(ele).find(".product-middle").find(".main-title").text().trim(); // .f_0053aa  .children().filter(".f_0053aa")
        price =parseFloat($(ele).find(".product-right").find(".real-price").find(".price").text().split("￥")[1]);
        // time  = $(ele).find(".tqs").find(".time").find("span").text().trim();
        // supplier = $(ele).find(".tqs").find(".brand").find("span").text().trim();
       
        people   = $(ele).find(".product-middle").find(".rate-msg").children("span").first().text().trim();
        
        img =  $(ele).find(".product-left").find(".main-img").find("img").attr("data-src");
        let dataOne = {
          name:name,
          price:price,
          people:people,
          type:type,
          img:img,
        }
        data.push(dataOne);
        data[0].isOK = true;
      });
  }else {
    data[0].isOK = false;
  }
  // console.log("飞猪的全部数据",typeof data,data);
  return data;
}








 



