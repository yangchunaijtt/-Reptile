/**
 * 主要用于处理途牛获取到的数据
 */
const cheerio = require('cheerio');


// 返回的数据
let allElm = "";    // ajax获取到的所有数据
let tuniuData = []; // 返回首页的数据


module.exports = {
  handele(res){
    let tuniuData = tuniuHandle(res);
    return tuniuData;
  }
};

// 处理获取到的途牛数据
function tuniuHandle(res){
  let name = "";      // 名称
  let price = 0;      // 价格
  let type  = "";     //标签/类型
  let time = 0;       // 团期
  let supplier = ""; //供应商
  let score = "";    // 评分/满意度
  let people = 0;    // 多少人出游
  let data = {};    // 返回的data数据
  let img = "";  //取img数据
  allElm = res;
  // console.log("途牛数据类型",typeof res);
  let $ = cheerio.load(res.text);
  
  // 找到目标数据所在的页面元素，获取数据
  if ( $('div#niuren_list .contentcontainer .thelist ul') ) {
    $('div#niuren_list .contentcontainer .thelist ul').children("li").first().each((idx,ele) => {
      
        // 目前就获取第一条的第一个数据
        type = $(ele).find(".imgbox").find(".icon").text().trim();
        name  = $(ele).find(".main-tit").text().trim(); // .f_0053aa  .children().filter(".f_0053aa")
        price = parseFloat($(ele).find(".tnPrice").find("em").text());
        time  = $(ele).find(".tqs").find(".time").find("span").text().trim();
        supplier = $(ele).find(".tqs").find(".brand").find("span").text().trim();
        score    = $(ele).find(".comment-satNum").find("span").find("i").text()+"%".trim();
        people   = parseFloat($(ele).find(".trav-person").find(".person-num").find("i").text());
        img =  $(ele).find(".imgbox").find("img").attr("data-src");
        // console.log($(ele).find(".imgbox").html());
        data = {
          company:"途牛",
          push:[
            {
              name:name,
              price:price,
              time:time,
              // supplier:supplier,
              // score:score,
              // people:people,
              type:type,
              img:img
            }
          ]
          
        }
       
      });
  }else {
    // data[0].isOK = false;
  }
  
  return data;
}