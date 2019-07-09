/**
 * 封装发送请求的
 * 后面还得继续检测下用户的输入，如果不是中文的情况和其他情况。
 */
const superagent = require('superagent');// 引入所需要的第三方包
const ctrip = require("../ctrip");
const tuniu = require("../tuniu");



module.exports = {
  send(tips,req){
    req = encodeURI(req); // 把中文转成UrlEncode编码
    let url = "";         // 请求的地址
    if ( tips == "ctrip" ) {
      // 携程调用了
      /**
       * 携程的搜索例：
       * 1：长城：https://you.ctrip.com/sight/changchengdiyidun284/11108.html#ctm_ref=www_hp_his_lst
       * 2:北京：https://you.ctrip.com/SearchSite/?query=%u5317%u4EAC
       * 3：西湖：https://you.ctrip.com/SearchSite/?query=%u897F%u6E56
       * 4：上海：https://you.ctrip.com/SearchSite/?query=%E4%B8%8A%E6%B5%B7
       */
      url = 'https://you.ctrip.com/SearchSite/?query='+req;    // ajax的url
    }else if ( tips == "tuniu" ) {
      //途牛调用了
      /**
       * 途牛搜索案例
       * 1：上海：http://s.tuniu.com/search_complex/whole-cz-0-%E4%B8%8A%E6%B5%B7/
       */
      url = 'http://s.tuniu.com/search_complex/whole-cz-0-'+req;    // ajax的url
    }

    // 调用发送的ajax
    console.log("url",url);
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
        }
        console.log(errTrips,err);
        data = errTrips + err ;
      } else {
       // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
        let resTrips = "" ;
        if ( tips == "ctrip" ) {
          resTrips = "携程抓取成功";
          data = ctrip.handle(res);
        }else if ( tips == "tuniu" ) {
          resTrips = "途牛抓取成功";
          data = tuniu.handele(res);
        }
        console.log(resTrips);
      }
    });
    // 把处理好的数据返回上去。
    return data;
  }
};

