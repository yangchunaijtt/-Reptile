const superagent = require('superagent');// 引入所需要的第三方包
const request  = require("request");      // 引入node的request模块
const cheerio = require('cheerio');


let oldData = {};



function creditQuery(req,fun){
  let data = {};  //存储数据的地方
  let url = "";
  let dataUrl = "";
  let basicUrl = "";
  let  creditData = {
    company:"",
    err:"0",
  }
  /**
   * 百度信用举例：
   * 1：扬州德道宾馆有限公司
   * https://xin.baidu.com/s?q=%E6%89%AC%E5%B7%9E%E5%BE%B7%E9%81%93%E5%AE%BE%E9%A6%86%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&t=0
   * https://xin.baidu.com/detail/compinfo?pid=xlTM-TogKuTwbiofkxxvE5-I*q5KYXK17Qmd
   */
   url = "https://xin.baidu.com/s?q="+encodeURI(req)+"&t=0";
  superagent.get(url).end( (err,res) => {
    
    if (!err){
        
        let $ = cheerio.load(res.text);
          if ( false == $('body').find(".zx-list-item") || false ==$('body').find(".zx-list-item").find(".zx-list-item-url") ){
           
              fun(creditData);
            
          }else if ( $('body').find(".zx-list-item").find(".zx-list-item-url") ) {
            $('body').find(".zx-list-item").find(".zx-list-item-url").first().each( (idx,ele) => {
              ///detail/compinfo?pid=xlTM-TogKuTwbiofkxxvE5-I*q5KYXK17Qmd
              // https://xin.baidu.com/detail/compinfo?pid=xlTM-TogKuTwbiofkxxvE5-I*q5KYXK17Qmd
              dataUrl = "https://xin.baidu.com/" + $(ele).attr("href");
              basicUrl ="https://xin.baidu.com/detail/basicAjax?pid="+ $(ele).attr("href").split("pid=")[1]
              // console.log(req,$(ele).attr("title"));
              if (req == $(ele).attr("title")){
                
                request(basicUrl, function (error, response,body){
                  if (!error && response.statusCode == 200){  
                    data = JSON.parse(response.body).data;
                  
                      creditData.err="1"
                      creditData.legalPerson = data.legalPerson;
                      creditData.taxNo = data.taxNo === "" ?data.regNo:data.taxNo;
                      creditData.licenseNumber = data.licenseNumber;
                      creditData.regAddr = data.regAddr;
                      creditData.company = req;
                    fun(creditData);
                  }
                })
              }else {
                fun(creditData);
              }
            })
          }
    }else {

      fun(creditData);
      
    }
    
  })
}

module.exports.creditQuery = creditQuery ;