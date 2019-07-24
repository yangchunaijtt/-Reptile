/**
 * 用来处理驴妈妈的数据和请求
 * 驴妈妈：无评分，无供应商，无玩人数显示。
 */


const cheerio = require('cheerio');


// 返回的数据
let allElm = "";      // ajax获取到的所有数据
let lvmamaData = []; // 返回首页的数据


module.exports = {
  handele(res){
    let lvmamaData = lvmama(res);
    return lvmamaData;
  }
};

// 处理获取到的驴妈妈数据
function lvmama(res){
  let name = "";      // 名称
  let price = 0;      // 价格
  let type  = "";     //标签/类型
  let time = 0;       // 团期
  let supplier = ""; //供应商
  let score = "";    // 评分/满意度
  let people = 0;    // 多少人出游
  let data = [{isOK:false}];    // 返回的data数据
  let img = "";  //图片地址
  allElm = res;
  // console.log("驴妈妈数据类型",typeof res);
  let $ = cheerio.load(res.text);
  
  // 找到目标数据所在的页面元素，获取数据
  if ( $('div.everything .main .search-ajax-box .main-content .product-list').children(".product-item").first() ) {
    $('div.everything .main .search-ajax-box .main-content .product-list').children(".product-item").first().each((idx,ele) => {
        // console.log("驴妈妈ele",$(ele).text());
        // 目前就获取第一条的第一个数据
        type = $(ele).find(".product-left").find(".product-picture").find("span").text().trim();   // 类型
        name  = $(ele).find(".product-section").find(".product-title").find("span").text().trim(); // 
        price = parseFloat($(ele).find(".product-info").find(".product-price").find("em").text());
        time  = $(ele).find(".product-section").find(".product-details").find("em").text().trim();
        img = $(ele).find(".product-left").find("img").attr("src");
        // supplier = "无供应商";
        // score    = $(ele).find(".comment-satNum").find("span").find("i").text()+"%".trim();
        // people   = parseFloat($(ele).find(".trav-person").find(".person-num").find("i").text());

        let dataOne = {
          name:name,
          price:price,
          time:time,
          type:type,
          img:img,
        }
        
        data.push(dataOne);
        data[0].isOK = true;
      });
      
  }else {
    data[0].isOK = false;
  }
  //  console.log("驴妈妈的数据",data);
  // console.log("驴妈妈的全部数据",typeof data,data);
  return data;
}








 



