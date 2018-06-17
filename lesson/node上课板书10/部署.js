/*
部署项目
软件安装
====
安装 git nginx
apt-get install git nginx

首先用 root 用户登录, 登录之后默认在 /root 目录


注意你的项目名称应该为 node10_2
里面包含板书 node10_2 这个目录里面的所有文件
clone 项目
git clone <这里填写你的项目的git地址>
clone 之后会在 /root 下增加一个目录 node10_2

把 node10_2 移动到 /var/www 目录下
mv node10_2 /var/www/node10_2



ubuntu 的软件仓库中的 nodejs 更新很慢, 几乎可以认为不可用,
所以我们从 nodeSource 仓库中安装新款 nodejs
p
配置 nodeSource 仓库
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -

配置之后就可以安装最新的 nodejs
sudo apt-get install -y nodejs

安装 yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update && sudo apt-get install yarn

安装依赖
yarn install

配置 nginx
ln -s /var/www/node10_2/todo.nginx /etc/nginx/sites-enabled/todo


移除默认的配置文件
mv /etc/nginx/sites-enabled/default /tmp
mv /etc/nginx/sites-available/default /tmp


重启 nginx
service nginx restart

运行程序
(node app.js &)
*/
