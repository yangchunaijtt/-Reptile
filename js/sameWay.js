/**
 * 同程的数据弃用了。
 * sameWay.js：处理同程旅游网站返回的数据
 * 同程取DOM结构时报错，等明天再处理下。
 * 同程旅游取数据方式是get:
 *长城： https://so.ly.com/commonAjax/AjaxHandler/GetSearchResult?sourceType=pc&searchType=1000&callback=jQuery183039805376612878796_1562918481184&keyword=%25E9%2595%25BF%25E5%259F%258E&startCityId=221&projectType=0&selectType=&selectSourceType=0&sort=0&isStat=1&from=1&to=20&cityname=%E5%B8%B8%E5%B7%9E&fchannel=&fpagetype=&_=1562918481598
 *西湖 https://so.ly.com/commonAjax/AjaxHandler/GetSearchResult?sourceType=pc&searchType=1000&callback=jQuery18301552523291830028_1563156363935&keyword=%25E8%25A5%25BF%25E6%25B9%2596&startCityId=221&isStat=0&selectType=&selectSourceType=0&isTab=1&projectType=0&cityname=%E5%B8%B8%E5%B7%9E&fchannel=&fpagetype=&_=1563156364046
 */


const cheerio = require('cheerio');
const send = require("./send/send");    // 调用ajax的请求
const superagent = require('superagent');// 引入所需要的第三方包
const request  = require("request");      // 引入node的request模块

// const jsonp = require('superagent-jsonp') 
// 返回的数据
let allElm = "";    // ajax获取到的所有数据
let sameWayData = []; // 返回首页的数据
let url = "";

module.exports = {
  handele(res,req){
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
      console.log("同程的req2",encodeURI(req));
      url= "https://so.ly.com/commonAjax/AjaxHandler/GetSearchResult?sourceType=pc&searchType=1000&callback=jQuery18303345215045856573_1563176873062&keyword="+encodeURI(req)+"&startCityId=221&isStat=0&selectType=&selectSourceType=0&isTab=1&projectType=0&cityname=%E5%B8%B8%E5%B7%9E&fchannel=&fpagetype=";
      let kw = {
        'sourceType':'pc',
        "searchType":"1000",
        // "callback":"jQuery18303345215045856573_1563176873062",
        "keyword":encodeURI(req),
        "startCityId":221,
        "isStat":0,
        "selectType":"",
        "selectSourceType":0,
        "isTab":1,
        "projectType":0,
        "cityname":"%E5%B8%B8%E5%B7%9E",
        "fchannel":"",
        "fpagetype":""
      } 
      // let headers = 
      request(url, function (error, response, body) { //获取指定连接此为get方法
      if (!error && response.statusCode == 200) {
          data[0].isOK = true;
          data.push(response.body);
        //  console.log("同程取数据",typeof data,data);
        return data;
      }else{
        data[0].isOK = false;
      }
    })
  }
};









 



