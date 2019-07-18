// /**
//  * 常州春秋旅游:springtour.js
//  */
// const cheerio = require('cheerio');
// const send = require("./send/send");    // 调用ajax的请求
// const request  = require("request");      // 引入node的request模块

// module.exports = {
//   handele(res){
//     // 
//     let springtourData = springtour(res);
//     return springtourData;
//   }
// };


// function springtour(res){
//   let name = "";      // 名称
//   let price = 0;      // 价格
//   let type  = "";     //标签/类型
//   let time = 0;       // 团期
//   let supplier = ""; //供应商
//   let score = "";    // 评分/满意度
//   let people = 0;    // 多少人出游
//   let data = [{isOK:false}];    // 返回的data数据
//   allElm = res;
//   // console.log("常州春秋数据类型",typeof res);
//   let $ = cheerio.load(res.text);
//   // if ( $("body")) {
//   //   $("body").each( (idx,ele) => {
//   //     console.log("常州春秋",$(ele).text());
//   //   })
//   // }
//   // 下面需要ajax获取下数据
  
// }