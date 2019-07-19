/**
 * 主页：主要是使用express本地服务器功能，调用其他的获取数据.
 * 后面可以在这里多加功能：
 * 比如：多种方式输入获取数据.
 * 最后得改成：提供一个接口给外面，外面调用那个接口，去取数据。
 * 目前查的主要是旅游
 * 一：目前几个文件无需调用：
 *  springtour.js,
 *  ctrip.js
 *  send.js
 * 二：目前存在的问题：
 *  1：携程调用数据问题
 *  2：如何向上一层返回数据
 */
// const tuniu = require("./js/tuniu");    //应用获取途牛的数据
const superagent = require('superagent');// 引入所需要的第三方包
const request  = require("request");      // 引入node的request模块
const cheerio = require('cheerio');
const express = require('express');//引入express 


const tuniu = require("./js/tuniu");
const lvmama = require("./js/lvmama");
const fliggy = require("./js/fliggy");
const sameWay = require("./js/sameWay");
const  callJs = require("./call");


//返回的数据
let data = [];
let tuniuReq = "西湖";  //输入给途牛的查询数据
let ctripReq = "丽水";  //输入给携程的查询数据
let lvmamaReq = "西湖"; // 输入给驴妈妈的查询数据
let figgyReq = "西湖";  // 输入给飞猪的查询数据
let sameWayReq = "长城";  // 输入给同程旅游的查询数据
// 返回给首页的数据
let indexData = [
  {isOK:false,num:0}
];   //返回给首页的数据
let superagentFrequency  = 5; // 需要ajax的次数

// 调用
// 得用classback返回下数据
// callHandel("all","西湖",true);
// 发送post请求

/**
 * 本地服务部分代码
 */
const app = express();// 初始化
//配置服务端口

var server = app.listen(8090, () => {
  console.log( '服务器启动:localhost:8090');
});
//发送给页面请求
app.get("/", (req, res) => {

  res.send(indexData);

});
  

/**
 * 公用的模块部分
 */
module.exports = {
  indexData: [
    {isOK:false,num:0}
  ],
  reptile(trip,name,frequency){  // 给外界提供一个调用的接口 frequency:次数是否为五次，还是单词。
    let data = [];
    // 提供一个输入的地方，后面需要判断
      if (null == name){
        let name = "";
      }

      tuniuReq =  name;
      ctripReq =  name;
      lvmamaReq =  name;
      figgyReq  =  name;
      sameWayReq =  name;


    // 判断要调用那个网站数据
    if ( null == trip || trip == "" ) {
      let trip = "all";
    }else if ( trip == "tuniu" ){ 
      // 调用途牛
      send("tuniu",tuniuReq,frequency);
    } else if ( trip == "ctrip") {
      // 调用携程
      send("ctrip",ctripReq,frequency);
    }else if ( trip == "lvmama") {
      // 调用驴妈妈
      send("lvmama",lvmamaReq,frequency);
    }else if ( trip == "figgy") {
      // 调用飞猪
      send("figgy",figgyReq,frequency);
    }else if ( trip == "sameWay") {
      // 调用同程
      send("sameWay",sameWayReq,frequency);
    }else if ( trip == "springtour") {
      // 调用常州春秋
      send("springtour",sameWayReq,frequency);
    }else if ( trip == "all" ) {
      // 调用携程
      send("ctrip",ctripReq,frequency);
      // 调用途牛
      send("tuniu",tuniuReq,frequency);
       // 调用驴妈妈
      send("lvmama",lvmamaReq,frequency);
       // 调用飞猪
      send("figgy",figgyReq,frequency);
      // 调用同程
      send("sameWay",sameWayReq,frequency);
      // 调用常州春秋
      send("springtour",sameWayReq,frequency);
    }
    //定时执行，5秒后执行
    var t1= setTimeout(returnClassData,3000);
    //去掉定时器的方法  
    clearTimeout(t1); 
  },
}

function returnClassData (){
  return indexData;
}


/**
 * 封装发送请求的
 * 后面还得继续检测下用户的输入，如果不是中文的情况和其他情况。
 */

function send(tips,req,frequency){
  req = encodeURI(req); // 把中文转成UrlEncode编码
  let url = "";         // 请求的地址
  if ( tips == "ctrip" ) {
    // 携程调用了
    /**
     * 携程的全部搜索例：
     * 1：长城：https://you.ctrip.com/sight/changchengdiyidun284/11108.html#ctm_ref=www_hp_his_lst
     * 2:北京：https://you.ctrip.com/SearchSite/?query=%u5317%u4EAC
     * 3：西湖：https://you.ctrip.com/SearchSite/?query=%u897F%u6E56
     * 4：上海：https://you.ctrip.com/SearchSite/?query=%E4%B8%8A%E6%B5%B7
     * 携程的旅游搜索例：
     * https://vacations.ctrip.com/whole-213B126/?searchValue=%e8%a5%bf%e6%b9%96&searchText=%e8%a5%bf%e6%b9%96&from=do
     * 1：上海：https://vacations.ctrip.com/tours/d-shanghai-2?from=do
     * 2：台湾：https://vacations.ctrip.com/tours/d-taiwan-100076?from=do
     * 3：西湖："https://vacations.ctrip.com/whole-213B126/?searchValue=%e8%a5%bf%e6%b9%96&searchText=%e8%a5%bf%e6%b9%96&from=do"
     * https://huodong.ctrip.com/activity/search/?keyword=
     * https://huodong.ctrip.com/activity/search/?keyword=%25e8%25a5%25bf%25e6%25b9%2596%25e4%25b8%2580%25e6%2597%25a5%25e6%25b8%25b8
     * 
     * https://huodong.ctrip.com/dailytour/search/?keyword=%e8%a5%bf%e6%b9%96%e4%b8%80%e6%97%a5%e6%b8%b8
     * 
     * :
     */
    url = "https://vacations.ctrip.com/grouptravel-b64/?searchValue="+req+"&searchText="+req+"&from=do";    // ajax的url
    
  }else if ( tips == "tuniu" ) {
    //途牛调用了
    /**
     * 途牛搜索案例
     * 1：上海：http://s.tuniu.com/search_complex/whole-cz-0-%E4%B8%8A%E6%B5%B7/
     */
    url = 'http://s.tuniu.com/search_complex/whole-cz-0-'+req;    // ajax的url
  }else if ( tips == "lvmama" ) {
    // 驴妈妈调用
    /**
     * 驴妈妈搜索示例：
     * 1：长城：http://s.lvmama.com/route/H59K320400?keyword=%E9%95%BF%E5%9F%8E&k=0&losc=332207&ict=i#list
     * 2：上海：http://s.lvmama.com/route/H59K320400?keyword=%E4%B8%8A%E6%B5%B7&k=0&losc=332207&ict=i#list
     */
    url = "http://s.lvmama.com/route/H59K320400?keyword="+req+"&k=0&losc=332207&ict=i#list";
    
  }else if ( tips == "figgy" ) {
    // 飞猪调用
    /**
     * 飞猪调用示例：
     * 1：长城：https://www.fliggy.com/?spm=181.11197625.5190364.1.19d24a0aV0zoNB
     * 2：上海：https://travelsearch.fliggy.com/index.htm?searchType=product&keyword=%E4%B8%8A%E6%B5%B7
     * 3：西湖：https://travelsearch.fliggy.com/index.htm?searchType=product&keyword=%E8%A5%BF%E6%B9%96
     */
    url = "https://travelsearch.fliggy.com/index.htm?searchType=product&keyword="+req;

  }else if ( tips == "sameWay" ) {
   
    let  sameWayUrl= "https://so.ly.com/commonAjax/AjaxHandler/GetSearchResult?sourceType=pc&searchType=1000&callback=jQuery18303345215045856573_1563176873062&keyword="+encodeURI(req)+"&startCityId=221&isStat=0&selectType=&selectSourceType=0&isTab=1&projectType=0&cityname=%E5%B8%B8%E5%B7%9E&fchannel=&fpagetype=";         
    
    request(sameWayUrl, function (error, response,body) { //获取指定连接此为get方法
      if (!error && response.statusCode == 200) {
        
        let same_data = response.body.split("jQuery18303345215045856573_1563176873062")[1];
        let sameWayGetData = eval('(' + same_data + ')');
        // console.log(typeof sameWayGetData.ReturnValue.Records,sameWayGetData.ReturnValue.Records[0]);
        
         let  sameWay_join = [{
           isOK:false
         }]
         let sameWay_push = {};
        //  console.log("同程取数据",sameWayGetData.ReturnValue.Records[0],"=====");
         if ( null == sameWayGetData.ReturnValue.Records[0]) {
            sameWay_join[0].isOK = false;
         } else {
          sameWay_join[0].isOK = true ;
          sameWay_push = {
            name:sameWayGetData.ReturnValue.Records[0].Title,
            price:sameWayGetData.ReturnValue.Records[0].Price/100,
            type:sameWayGetData.ReturnValue.Records[0].InnerTypeName,
            img:sameWayGetData.ReturnValue.Records[0].Picture,
            otherNode:""
          }
          sameWay_join.push(sameWay_push);
          indexData[0].isOK =true;
          indexData[0].num ++;
          indexData.push({"sameWay":sameWay_join});
          // console.log("同程获取到的数据",sameWay_join,"===");
         }
        //  console.log("同程获取到的数据",sameWay_join,"===");
      }
    });

  }else if ( tips == "springtour" ) {
    /**
     * 常州春秋调用示例：
     * 1：杭州西湖：http://www.springtour.com/changzhou-%E6%9D%AD%E5%B7%9E%E8%A5%BF%E6%B9%96
     * 2：长城一日游：http://www.springtour.com/changzhou-%E9%95%BF%E5%9F%8E%E4%B8%80%E6%97%A5%E6%B8%B8
     */
    url = "http://www.springtour.com/changzhou-"+req;
  }
  
  // 调用发送的ajax
  // console.log("url",url,tips);
  let data;
  superagent.get(url).end((err,res) => {
    if (!err)  {
      // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
      let resTrips = "" ;
      if ( tips == "ctrip" ) {
       
        let tripJsonArr = {
          data:""
        };
        
        
        resTrips = "携程抓取成功";
        // ctripHadle(res,req);
        // data = ctrip.handle(res,req);
        // indexData.push({"ctrip":data});
        // indexData[0].isOK =true;
        // indexData[0].num ++;
        let $ = cheerio.load(res.text);
        // 发送进入的数据
        let ctrip_join = [{
          isOK:false
        }]
        let ctrip_push = {};  // 存入进去的数据
        // console.log("携程的res",res);
        if ( $('body').find("textarea") ) {
          
          $('body').find("textarea").each((idx,ele) => {
            // 这里报错了
            // console.log("22");
            // console.log("携程的ele",typeof $(ele).text(),typeof JSON.parse($(ele).text()),JSON.parse($(ele).text()), JSON.parse($(ele).text()).Id );
            if ( null != JSON.parse($(ele).text()).Id  ){
              if ( tripJsonArr.data == ""){
                tripJsonArr.data = JSON.parse($(ele).text());
                let trips_paramsjson = {
                  "params":'[{"Id":"'+tripJsonArr.data.Id+'","Bu":"'+tripJsonArr.data.Bu+'","Did":"'+tripJsonArr.data.DepartureId+'"}]'//,
                  //"params":'[{"Id":22110880,"Bu":"GT","Did":213}]'
                  //"keyword":encodeURI(tripJsonArr.data.Name) 
                };
                // console.log(tripJsonArr.data,"=========",trips_paramsjson);
                // request.post()
                // request.post();
                request.post({url:'https://vacations.ctrip.com/tour-mainsite-vacations/api/product', form:trips_paramsjson}, function(error, response, body) {
                  if (!error && response.statusCode == 200) {
                    let ctrip_bodyjson =  JSON.parse(body)[0];
                    // console.log("携程获取到的数据",ctrip_bodyjson);
                    //  console.log(JSON.parse(body)) // 请求成功的处理逻辑  
                     indexData[0].isOK =true;
                     indexData[0].num ++;
                     ctrip_join[0].isOK = true;
                     ctrip_push = {
                      type:ctrip_bodyjson.Remarks,
                      name:ctrip_bodyjson.ProName,
                      img:ctrip_bodyjson.ImageUrl,
                      price:ctrip_bodyjson.Price,
                      supplier:ctrip_bodyjson.VendorName,
                      time:ctrip_bodyjson.ScheduleDesc,
                      // otherNede:JSON.parse(body),
                     };
                     ctrip_join.push(ctrip_push);
                     indexData.push({"ctrip":ctrip_join});
                    //  console.log("首页indexData1111",indexData);
                  }
                })
                
              }
            }
          })
        }else {
          
          ctrip_join[0].isOK = false;
          indexData.push({"ctrip":ctrip_join});
          
        }
       
      }else if ( tips == "tuniu" ) {
        resTrips = "途牛抓取成功";

        data = tuniu.handele(res);
        indexData.push({"tuniu":data});
        indexData[0].isOK =true;
        indexData[0].num ++;
       
      }else if ( tips == "lvmama" ) {
        
        resTrips = "驴妈妈抓取成功";
        data = lvmama.handele(res);
        
        indexData.push({"lvmama":data});
        indexData[0].isOK =true;
        indexData[0].num ++;
        

      }else if ( tips == "figgy" ) {
        
        resTrips = "飞猪抓取成功";
        data = fliggy.handele(res);
                  
        indexData.push({"figgy":data});
        indexData[0].isOK = true;
        indexData[0].num ++;
       
      }else if (  tips == "springtour"  ) {
        // 调用
        resTrips = "常州春秋抓取成功";
        indexData[0].num ++;
        indexData[0].isOK =true;
        // data = springtour.handele(res);
        // 常州春秋的参数
        
        let springtour_postjson = {
          data: {groupedQuery: {}, keywords: decodeURI(req), startCity: "常州"},
          springsign: "5E6961CA28DD9275948BC7EF5BC7AD60F4F535A8"
        };
        // console.log("",springtour_postjson);
          request({
            url: "http://www.springtour.com/w/search/query",
            method: "POST",
            json: true,                                                                                                                                                                                                                                                                                                                                                                
            headers: {
                "content-type": "application/json",
            },
            body:springtour_postjson
          }, function(error, response,body) {
            
            if (!error && response.statusCode == 200) {
            // console.log("常州春秋xxx",JSON.parse(body));
            // console.log("常州春秋xxxxx",typeof body,body.search) // 请求成功的处理逻辑
              data = body;
              // indexData.push({"springtour":data.search});
              // if(indexData[0].num >= 5){
              //   console.log("首页indexData222222",indexData);
              // }
              let springtour_join = [{isOK:false}];
              if ( null == data.search.data[0] ) {
                springtour_join[0].isOK = false;
              }else {
                springtour_join[0].isOK = true;
                let timeArr = [];
                for (var index in data.search.data[0].schedule.datePrices){
                    timeArr.push(data.search.data[0].schedule.datePrices[index].date);
                }
                springtour_join.push({
                  name:data.search.data[0].name,
                  price:data.search.data[0].schedule.minPrice,
                  type:data.search.data[0].attributeName,
                  supplier:data.search.data[0].supplierName,
                  img:data.search.data[0].picture,
                  time:timeArr,
                  otherNede:data.search.data[0].schedule
                });
                indexData.push({"springtour":springtour_join});
                // console.log("常州春秋传入的数据",indexData);
              } 
              // console.log("常州春秋传入的数据",springtour_join);
            }
        }); 
        
      }else if ( tips == "new"){
        // 赋值为初始化的方法
        indexData = [
          {isOK:false,num:0}
        ];
      }

      // if(indexData[0].num >= 6){
      //   console.log("首页indexData222222",indexData);
      // }
      // console.log("首页indexData22222",indexData);
      return indexData;
    }
  });
}
// 价格，名称，时间 ，类型。

