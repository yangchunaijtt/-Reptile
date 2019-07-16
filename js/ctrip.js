/**
 * 主要用来处理携程数据
 * class.js有点弃用了。
 */

const cheerio = require('cheerio');
const request = require('superagent');// 引入所需要的第三方包，给携程发那么post请求
const send = require("./send/send");    // 调用ajax的请求

// 返回的数据
let allElm = "";    // ajax获取到的所有数据
let ctripData = []; // 返回首页的数据
let ctripPostJson = {};

module.exports = {
  handle(res,req){
    let data = ctripHandle(res,req);
    return data;
  }
};

// 处理获取到的携程数据
function ctripHandle(res,req){
  let name = "";      // 名称
  let price = 0;      // 价格
  let type  = "";     //标签/类型
  let time = 0;       // 团期
  let supplier = ""; //供应商
  let score = "";    // 评分/满意度
  let people = 0;    // 多少人出游
  let data = [{isOk:false}];    // 返回的data数据
  allElm = res;
  // console.log("携程数据类型",typeof res);

  let $ = cheerio.load(res.text);
  // console.log("携程DOM",false == $('#_main .base_bd #_prd'));
  if ( $('#_main').first() ) {
    $('#_main').each((idx,ele) =>{
      // console.log("携程的数据",$(ele).text())

    })
  }
  
  // 发送post请求
  // console.log("携程的数据",res.text);
  
}