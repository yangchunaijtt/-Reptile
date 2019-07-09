# 启动
```
    node index.js
```
# 下载
```
  npm i
```

# 引用
1：引入我的index.js文件
```
  const reptile = require("reptile")
```
2:index.js文件夹中提供了目前只提供了一个方法：reptile(name,trip);
(1):name:输入要查询的名称(例：上海，长城)，可为空，默认为空。
```
  reptile.reptile("上海","");
```
(2):trip:输入要爬那几个网站的数据：(目前有：途牛，携程。)(可以输入四个参数："","tuniu","ctrip","all"),默认为"all"。
```
  reptile.reptile("","all");
```

