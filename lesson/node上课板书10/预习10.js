/*
今天上课开始 我们要使用 express 框架来替代我们之前实现的 server.js
我们写的 server.js 相当于一个简化版的 express
本质是一样的, 使用方法也类似

我们之前实现 server.js 用的是最底层的 socket, node 里面用了 net 这个模块来实现 socket,
同时 node 提供了 http 这个模块来实现 http 的相关操作, 这个模块提供了更高层的封装,
实际上很多框架都是在 http 模块的基础上进行封装
express 就是把常用的功能写成函数, 然后拼在一起打包, 这样就是一个 web 框架了

express 是借鉴 ruby 的 sinatra 框架


需要安装 express, 使用 yarn 安装如下
yarn add express

如果在 package.json 里面列出了这个依赖, 直接使用下面的命令安装
yarn install

部署需要使用 git, 我们选用 https://coding.net/ 这个网站的服务, 请自己注册帐号
git 客户端软件使用 https://desktop.github.com/  请自行下载安装


c
perl
php
java
ror(ruby on rails)
python
node(javascript) express/koa/


在 ubuntu 安装 yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
*/
