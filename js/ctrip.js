/**
 * 主要用来处理携程数据
 */

const cheerio = require('cheerio');
const send = require("./send/send");    // 调用ajax的请求

// 返回的数据
let allElm = "";    // ajax获取到的所有数据
let ctripData = []; // 返回首页的数据


module.exports = {
  handle(res){
    let data = ctripHandle(res);
    return data;
  }
};

// 处理获取到的携程数据
function ctripHandle(res){
  allElm = res ;
  let data = [];
  console.log("携程数据类型",typeof res);
  let $ = cheerio.load(res.text);
  
  // // 找到目标数据所在的页面元素，获取数据
  // $('div.content_left .layer .layer_header h2').each((idx,ele) => {
  //   let header = []; // 标题类型
  //   header = $(ele).text();
  //   // console.log(typeof header,header);  
  // });

  return data;
}