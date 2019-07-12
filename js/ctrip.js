/**
 * 主要用来处理携程数据
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
  // console.log("携程的req",req);

  // 发送post请求
  
  request.post('https://vacations.ctrip.com/tour-mainsite-vacations/api/product')
  .set('Content-Type', 'application/json')
  .send({"params":[{"Id":21564559,"Bu":"GT","Did":0,"RuleId":0},{"Id":22497213,"Bu":"GT","Did":213},{"Id":19466216,"Bu":"GT","Did":213},{"Id":18091167,"Bu":"GT","Did":213},{"Id":16334303,"Bu":"GT","Did":213},{"Id":22897228,"Bu":"GT","Did":213},{"Id":23165630,"Bu":"GT","Did":213}],"keyword":"西湖"})
  .end((err,res) => {
    if (err){
      console.log("携程post请求出错");
    }else {
      ctripPostJson = JSON.parse(res.text);
      console.log("携程post请求",ctripPostJson,typeof JSON.parse(res.text));
      
      
      // name  = res.body[0]
      // price = 
      // time  = 
      // supplier = 
      // score    = 
      // people   = 
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
      // console.log("携程的全部数据",data);
      return data;
    }
  })
  
}