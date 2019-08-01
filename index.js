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
const express = require('express');//引入express 



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
//配置服务端口

var server = app.listen(8090, () => {
  console.log( '服务器启动:http://192.168.1.7:8090');
});
//发送给页面请求
app.all("/", (req,res) => {
 
  if ( null == req.query.name || req.query.name ==="" ) {
    vice.errreptile(function(indexData){
      res.send(indexData);
    })
  }else{
    vice.reptile("all",req.query.name,function(indexData){
      res.send(indexData);
    })
      
    }

});

// 企业信用查的路由
app.get("/credit", (req,res) => {
  //let ddd=req.param.ss
  // console.log(req.query.name);
  if ( null == req.query.name || req.query.name ==="" ) {
    res.send({
      err:"0"
    });
  } else {
    credit.creditQuery(req.query.name,function(creditData){
      // console.log(creditData);
      res.send(creditData);
    })
  }
  
});



