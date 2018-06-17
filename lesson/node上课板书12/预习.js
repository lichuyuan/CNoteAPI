/*

 web 安全
 csrf
 xss
 1. 转义
 2. 保护好 cookie

 板块功能
 板块的添加属于管理员操作
 添加新 topic 的时候, 需要选择板块
 默认会给你选中当前板块

 用户资料管理功能
 用户头像上传

 过滤器 filter
 flash message

 nginx
 性能好
 安全性高



 nginx 通信原理
 nginx 接管 80 端口, 也就是说 80 端口的请求会被 nginx 处理
 nginx 收到 80 端口的请求之后, 会转发到 0.0.0.0:5000 端口,
 也就是转发给 app.js 处理
 server {
     # 监听 80 端口
     listen 80;
     # 默认请求路径
     location / {
         # 请求会被发送到 http://0.0.0.0:5000
         proxy_pass http://0.0.0.0:5000;
     }
 }

 pm2
 pm2 日志目录: ~/.pm2/logs

*/
