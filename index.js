/**
 * 主页：主要是使用express本地服务器功能，调用其他的获取数据.
 * 后面可以在这里多加功能：
 * 比如：多种方式输入获取数据.
 * 最后得改成：提供一个接口给外面，外面调用那个接口，去取数据。
 * 目前查的主要是旅游
 */
// const tuniu = require("./js/tuniu");    //应用获取途牛的数据
// const ctrip = require("./js/ctrip");   // 引用携程的数据
const superagent = require('superagent');// 引入所需要的第三方包

const ctrip = require("./js/ctrip");
const tuniu = require("./js/tuniu");
const lvmama = require("./js/lvmama");
const fliggy = require("./js/fliggy");
const sameWay = require("./js/sameWay");
const  callJs = require("./call");


//返回的数据
let data = [];
let tuniuReq = "西湖";  //输入给途牛的查询数据
let ctripReq = "西湖";  //输入给携程的查询数据
let lvmamaReq = "西湖"; // 输入给驴妈妈的查询数据
let figgyReq = "西湖";  // 输入给飞猪的查询数据
let sameWayReq = "西湖";  //输入给同程旅游的查询数据
// 返回给首页的数据
let indexData = [
  {isOK:false,num:0}
];   //返回给首页的数据
let superagentFrequency  = 5; // 需要ajax的次数

// 调用
// 得用classback返回下数据
// callHandel("all","西湖",true);
// 发送post请求
  

module.exports = {
  reptile(trip,name,frequency){  // 给外界提供一个调用的接口 frequency:次数是否为五次，还是单词。
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
    }else if ( trip == "all" ) {
      // 调用携程
      send("ctrip",ctripReq,frequency);
      // 调用途牛
      send("tuniu",tuniuReq);
       // 调用驴妈妈
       send("lvmama",lvmamaReq,frequency);
       // 调用飞猪
      send("figgy",figgyReq,frequency);
      // 调用同程
      send("sameWay",sameWayReq,frequency);
      console.log("首页的data");
    }
    
  }
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
     * 1：上海：https://vacations.ctrip.com/tours/d-shanghai-2?from=do
     * 2：台湾：https://vacations.ctrip.com/tours/d-taiwan-100076?from=do
     * 3：西湖："https://vacations.ctrip.com/whole-213B126/?searchValue=%e8%a5%bf%e6%b9%96&searchText=%e8%a5%bf%e6%b9%96&from=do"
     */
    url = 'https://vacations.ctrip.com/whole-213B126/?searchValue='+req+'&searchText='+req+'&from=do';    // ajax的url
    
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
    // 同程调用：
    /**
     * 同程调用示例：
     * 1：长城：https://so.ly.com/hot?q=%E9%95%BF%E5%9F%8E
     * 2：上海：https://so.ly.com/hot?q=%E4%B8%8A%E6%B5%B7
     * 3：西湖：https://so.ly.com/hot?q=%E8%A5%BF%E6%B9%96
     */
    url = "https://so.ly.com/hot?q="+req;

  }
  
  // 调用发送的ajax
  // console.log("url",url,tips);
  let data;    // 返回的data。

  // 发送ajax的get请求
  superagent.get(url).end((err,res) => {
    if (err) {
      // 如果访问失败或者出错，会这行这里
      let errTrips = "";
      if ( tips == "ctrip" ) {
        errTrips = "携程抓取失败";
      }else if ( tips == "tuniu" ) {
        errTrips = "途牛抓取失败";
      }else if ( tips == "lvmama" ) {
        errTrips = "驴妈妈抓取失败";
      }else if ( tips == "figgy" ) {
        errTrips = "飞猪抓取失败";
      }else if ( tips == "sameWay" ) {
        errTrips = "同程抓取失败";
      }
      console.log(errTrips,err);
      data = errTrips + err ;
    } else {
      // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
      let resTrips = "" ;
      if ( tips == "ctrip" ) {
        resTrips = "携程抓取成功";
        data = ctrip.handle(res,req);

        indexData.push({"ctrip":data});
        indexData[0].isOK =true;
        indexData[0].num ++;

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
        indexData[0].isOK =true;
        indexData[0].num ++;
        
        

      }else if ( tips == "sameWay" ) {
        
        resTrips = "同程抓取成功";
        data = sameWay.handele(res);
                  
        indexData.push({"sameWay":data});
        indexData[0].isOK =true;
        indexData[0].num ++;
       
        

      }else if ( tips == "new"){
        // 赋值为初始化的方法
        indexData = [
          {isOK:false,num:0}
        ];
      }
      //  console.log("首页indexData",indexData);
      return indexData;
    }
  });
}


