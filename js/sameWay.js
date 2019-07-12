/**
 * sameWay.js：处理同程旅游网站返回的数据
 * 同程取DOM结构时报错，等明天再处理下。
 * 同程旅游取数据方式是get:
 *长城： https://so.ly.com/commonAjax/AjaxHandler/GetSearchResult?sourceType=pc&searchType=1000&callback=jQuery183039805376612878796_1562918481184&keyword=%25E9%2595%25BF%25E5%259F%258E&startCityId=221&projectType=0&selectType=&selectSourceType=0&sort=0&isStat=1&from=1&to=20&cityname=%E5%B8%B8%E5%B7%9E&fchannel=&fpagetype=&_=1562918481598
 * 
 */


const cheerio = require('cheerio');
const send = require("./send/send");    // 调用ajax的请求

// 返回的数据
let allElm = "";    // ajax获取到的所有数据
let sameWayData = []; // 返回首页的数据


module.exports = {
  handele(res){
    let sameWayData = sameWayHandle(res);
    return sameWayData;
  }
};

// 处理获取到的同程数据
function sameWayHandle(res){
  let name = "";      // 名称
  let price = 0;      // 价格
  let type  = "";     //标签/类型
  let time = 0;       // 团期
  let supplier = ""; //供应商
  let score = "";    // 评分/满意度
  let people = 0;    // 多少人出游
  let data = [{isOK:false}];    // 返回的data数据
  allElm = res;
  // console.log("同程数据类型",typeof res);
  let $ = cheerio.load(res.text);
  // console.log(res.text)
  // 找到目标数据所在的页面元素，获取数据
  // console.log("同程DOM",$('.maincon .mainbody .main .main_left .search_list ul')== false); //   .main_left .search_list
  if ( $('.maincon .mainbody .main  .main_left .search_list ul') ) {
    $('div.maincon .mainbody .main  .main_left .search_list ul').each((idx,ele) => {
        console.log("同程的ele",$(ele).text())
        // 目前就获取第一条的第一个数据
        // name  = $(ele).find(".main-tit").text().trim(); // .f_0053aa  .children().filter(".f_0053aa")
        // price = parseFloat($(ele).find(".tnPrice").find("em").text());
        // time  = $(ele).find(".tqs").find(".time").find("span").text().trim();
        // supplier = $(ele).find(".tqs").find(".brand").find("span").text().trim();
        // score    = $(ele).find(".comment-satNum").find("span").find("i").text()+"%".trim();
        // people   = parseFloat($(ele).find(".trav-person").find(".person-num").find("i").text());

        let dataOne = {
          name:name,
          price:price,
          time:time,
          supplier:supplier,
          score:score,
          people:people,
        type:type
        }
        data.push(dataOne);
        data[0].isOK = true;
      });
  }else {
    data[0].isOK = false;
  }
  
  // console.log("同程的全部数据",typeof data,data);
  return data;
}








 



