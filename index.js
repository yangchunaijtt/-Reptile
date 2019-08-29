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
// const tuniu = require("./js/tuniu");    // 应用获取途牛的数据
const express = require('express'); // 引入express 


const credit = require("./js/credit");
const vice = require("./vice");


// 调用
// 得用classback返回下数据
// callHandel("all","西湖",true);
// 发送post请求

/**
 * 
 * 本地服务部分代码
 */
const app = express();// 初始化

//配置部分内容

// 配置ejs内容
app.set('views', __dirname + '/views');          // js文件用views里面的
app.use(express.static(__dirname + '/public')); //静态文件用public里面的

// 全局参数
let isEnd = "pc";   // 设置访问我这个api的设备，默认手机端访问我这个api。

//配置服务端口

var server = app.listen(8090, () => {
  console.log( '服务器启动:http://192.168.1.7:8090');
});
//发送给页面请求
app.all("/", (req,res) => {
  let returnData = {
    company:"",
    err:"",
    list:[
      
    ]
  }  
  // console.log(req.query);
  // 赋值
  isEnd = req.query.isend;
  if ( null == req.query.name || req.query.name ==="") {
    res.send("没有传入参数");
  }else if ( isEnd != "pc" && isEnd != "phone" ){
    res.send("isend设备参数出错");
  }else{
    vice.reptile("all",req.query.name,function(indexData){
      // 要做一下筛选，排除掉一样的内容
      // returnData.company = indexData.company;
      // returnData.err = indexData.err;
      // console.log(indexData);
      if ( isEnd === "pc" ) {
        res.render("tourism.ejs",indexData);
      }else if ( isEnd === "phone" ) {
        res.render("tourismPhone.ejs",indexData);
      }
      // res.send(indexData);
    }) 
    }

});

// 企业信用查的路由
app.get("/credit", (req,res) => {
  //let ddd=req.param.ss
  // console.log(req.query.name);
  // 赋值
  isEnd = req.query.isend;
  if ( null == req.query.name || req.query.name ==="" ) {
    res.send("没有传入参数");
  }else if ( isEnd != "pc" && isEnd != "phone"  ){
    res.send("isend传入参数出错");
  }else {
    credit.creditQuery(req.query.name,function(creditData){
      // console.log(creditData);
      // res.send(creditData);
      if ( isEnd === "pc" ) {
        res.render("credit.ejs",creditData);
      }else if (  isEnd === "phone"  ){
        res.render("creditPhone.ejs",creditData);
      }
      
    })
  }
  
});
