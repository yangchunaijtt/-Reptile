// /**
//  * 封装发送请求的
//  * 后面还得继续检测下用户的输入，如果不是中文的情况和其他情况。
// send.js目前弃用
//  */
// const superagent = require('superagent');// 引入所需要的第三方包
// const ctrip = require("../ctrip");
// const tuniu = require("../tuniu");
// const lvmama = require("../lvmama");
// const fliggy = require("../fliggy");
// const sameWay = require("../sameWay");
// const indexJs = require("../../index.js");
// const  callJs = require("../../call");

// console.log("INDEXJS",indexJs);

// // 返回给首页的数据
// let indexData = [
//   // {isOK:false,num:0}
// ];   //返回给首页的数据
// let superagentFrequency  = 5; // 需要ajax的次数


// module.exports = {
//   send(tips,req,frequency){
//     req = encodeURI(req); // 把中文转成UrlEncode编码
//     let url = "";         // 请求的地址
//     if ( tips == "ctrip" ) {
//       // 携程调用了
//       /**
//        * 携程的全部搜索例：
//        * 1：长城：https://you.ctrip.com/sight/changchengdiyidun284/11108.html#ctm_ref=www_hp_his_lst
//        * 2:北京：https://you.ctrip.com/SearchSite/?query=%u5317%u4EAC
//        * 3：西湖：https://you.ctrip.com/SearchSite/?query=%u897F%u6E56
//        * 4：上海：https://you.ctrip.com/SearchSite/?query=%E4%B8%8A%E6%B5%B7
//        * 携程的旅游搜索例：
//        * 1：上海：https://vacations.ctrip.com/tours/d-shanghai-2?from=do
//        * 2：台湾：https://vacations.ctrip.com/tours/d-taiwan-100076?from=do
//        * 3：西湖："https://vacations.ctrip.com/whole-213B126/?searchValue=%e8%a5%bf%e6%b9%96&searchText=%e8%a5%bf%e6%b9%96&from=do"
//        */
//       url = 'https://vacations.ctrip.com/whole-213B126/?searchValue='+req+'&searchText='+req+'&from=do';    // ajax的url
      
//     }else if ( tips == "tuniu" ) {
//       //途牛调用了
//       /**
//        * 途牛搜索案例
//        * 1：上海：http://s.tuniu.com/search_complex/whole-cz-0-%E4%B8%8A%E6%B5%B7/
//        */
//       url = 'http://s.tuniu.com/search_complex/whole-cz-0-'+req;    // ajax的url
//     }else if ( tips == "lvmama" ) {
//       // 驴妈妈调用
//       /**
//        * 驴妈妈搜索示例：
//        * 1：长城：http://s.lvmama.com/route/H59K320400?keyword=%E9%95%BF%E5%9F%8E&k=0&losc=332207&ict=i#list
//        * 2：上海：http://s.lvmama.com/route/H59K320400?keyword=%E4%B8%8A%E6%B5%B7&k=0&losc=332207&ict=i#list
//        */
//       url = "http://s.lvmama.com/route/H59K320400?keyword="+req+"&k=0&losc=332207&ict=i#list";
      
//     }else if ( tips == "figgy" ) {
//       // 飞猪调用
//       /**
//        * 飞猪调用示例：
//        * 1：长城：https://www.fliggy.com/?spm=181.11197625.5190364.1.19d24a0aV0zoNB
//        * 2：上海：https://travelsearch.fliggy.com/index.htm?searchType=product&keyword=%E4%B8%8A%E6%B5%B7
//        * 3：西湖：https://travelsearch.fliggy.com/index.htm?searchType=product&keyword=%E8%A5%BF%E6%B9%96
//        */
//       url = "https://travelsearch.fliggy.com/index.htm?searchType=product&keyword="+req;

//     }else if ( tips == "sameWay" ) {
//       // 同程调用：
//       /**
//        * 同程调用示例：
//        * 1：长城：https://so.ly.com/hot?q=%E9%95%BF%E5%9F%8E
//        * 2：上海：https://so.ly.com/hot?q=%E4%B8%8A%E6%B5%B7
//        * 3：西湖：https://so.ly.com/hot?q=%E8%A5%BF%E6%B9%96
//        */
//       url = "https://so.ly.com/hot?q="+req;

//     }
   
//     // 调用发送的ajax
//     // console.log("url",url,tips);
//     let data;    // 返回的data。

//     // 发送ajax的get请求
//     superagent.get(url).end((err,res) => {
//       if (err) {
//         // 如果访问失败或者出错，会这行这里
//         let errTrips = "";
//         if ( tips == "ctrip" ) {
//           errTrips = "携程抓取失败";
//         }else if ( tips == "tuniu" ) {
//           errTrips = "途牛抓取失败";
//         }else if ( tips == "lvmama" ) {
//           errTrips = "驴妈妈抓取失败";
//         }else if ( tips == "figgy" ) {
//           errTrips = "飞猪抓取失败";
//         }else if ( tips == "sameWay" ) {
//           errTrips = "同程抓取失败";
//         }
//         console.log(errTrips,err);
//         data = errTrips + err ;
//       } else {
//        // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
//         let resTrips = "" ;
//         if ( tips == "ctrip" ) {
//           resTrips = "携程抓取成功";
//           data = ctrip.handle(res,req);

//           indexData.push({"ctrip":data});
//           indexData[0].isOK =true;
//           indexData[0].num ++;

//         }else if ( tips == "tuniu" ) {
//           resTrips = "途牛抓取成功";

//           data = tuniu.handele(res);
//           indexData.push({"tuniu":data});
//           indexData[0].isOK =true;
//           indexData[0].num ++;
          
//         }else if ( tips == "lvmama" ) {
          
//           resTrips = "驴妈妈抓取成功";
//           data = lvmama.handele(res);
          
//           indexData.push({"lvmama":data});
//           indexData[0].isOK =true;
//           indexData[0].num ++;
          
          

//         }else if ( tips == "figgy" ) {
          
//           resTrips = "飞猪抓取成功";
//           data = fliggy.handele(res);
                    
//           indexData.push({"figgy":data});
//           indexData[0].isOK =true;
//           indexData[0].num ++;
          
          

//         }else if ( tips == "sameWay" ) {
          
//           resTrips = "同程抓取成功";
//           data = sameWay.handele(res);
                    
//           indexData.push({"sameWay":data});
//           indexData[0].isOK =true;
//           indexData[0].num ++;
          
         

//         }else if ( tips == "new"){
//           // 赋值为初始化的方法
//           indexData = [
//             {isOK:false,num:0}
//           ];
//         }
//         // callJs.reptilianData(indexData);
//         // console.log(resTrips,indexData);
//       }

//     });
//     // 把处理好的数据返回上去。
    
//     return indexData;
//   }
// };

