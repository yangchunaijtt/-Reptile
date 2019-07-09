/**
 * 主要用于处理途牛获取到的数据
 */
const cheerio = require('cheerio');
const send = require("./send/send");    // 调用ajax的请求

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
  allElm = res;
  let data = [];
  console.log("途牛数据类型",typeof res);
  let $ = cheerio.load(res.text);
  
  // // // 找到目标数据所在的页面元素，获取数据
  // // $('div.content_left .layer .layer_header h2').each((idx,ele) => {
  // //   let header = []; // 标题类型
  // //   header = $(ele).text();
  // //   // console.log(typeof header,header);  
  // // });
  
  return data;
}