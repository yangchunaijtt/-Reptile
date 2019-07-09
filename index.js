/**
 * 主页：主要是使用express本地服务器功能，调用其他的获取数据.
 * 后面可以在这里多加功能：
 * 比如：多种方式输入获取数据.
 * 最后得改成：提供一个接口给外面，外面调用那个接口，去取数据。
 * 目前查的主要是旅游
 */
const express = require('express');
const app = express();
// const tuniu = require("./js/tuniu");    //应用获取途牛的数据
// const ctrip = require("./js/ctrip");   // 引用携程的数据
const send = require("./js/send/send");

//返回的数据
let data = "默认数据";
let tuniuReq = "上海";  //输入给途牛的查询数据
let ctripReq = "上海";  //输入给携程的查询数据

let server = app.listen(8070, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host, port);
});

// 调用
callHandel("all");


// 调用发送请求的ajax
function callHandel(trip){
  if ( trip == "tuniu" ){
    // 调用途牛
    send.send("tuniu",tuniuReq);
  } else if ( trip == "ctrip") {
    // 调用携程
    send.send("ctrip",ctripReq);
  }else if ( trip == "all" ) {
    // 调用携程
    send.send("ctrip",ctripReq);
    // 调用途牛
    send.send("tuniu",tuniuReq);
  }
}

app.get('/', async (req, res, next) => {
  res.send(data);
});