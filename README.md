# 启动
```
    node index.js
```
# 下载
```
  npm i
```

# 引用
  通过路由url传值
  例
  ```
   http://localhost:8090/?name=西湖&isend=pc
   http://localhost:8090/?name=西湖&isend=phone
   http://localhost:8090/credit?name=扬州大学&isend=pc
   http://localhost:8090/credit?name=扬州大学&isend=phone
  ```
  路由输错了，会返回错误的提示
  ```
  http://localhost:8090/
  http://localhost:8090/credit
  ```

