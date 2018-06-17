/*
node14

redis
注意, 不考虑在 windows 上使用 redis
所以这部分需要在 ubuntu 上安装 redis
mac 可以在本机安装(brew install redis),
这里只给出 ubuntu 相关部分

ubuntu 上安装 redis 的命令
sudo apt-get install redis-server

安装完成后会自动启动服务, 输入 redis-cli 可以在命令行进行操作

redis 客户端软件
1. windows 下使用 medis(会上传到群文件)
2. mac 使用 brew cask install medis 安装



mongoose
一个操作 mongodb 的 ODM(Object Document Mapper),
ODM 就是把对象和文档关联起来
也就是让我们可以在 JS 里面方便地操作数据库(document)


ubuntu 安装 mongodb 的命令
注意, 安装 mongodb 可能需要花费比较久的时间
所以建议更换清华源之后安装
1.
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

2.
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

3.
sudo apt-get update

4.
sudo apt-get install -y mongodb-org

5. 启动 mongodb
sudo service mongod start


更新清华源之后安装 mongodb 的速度会明显变快
1. 信任 mongodb 的 gpg 公钥
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

2.
通过软链接的方式指定 mongodb 的源
ln -f -s <项目根目录/mongodb.list> /etc/apt/sources.list.d/mongodb.list

3. 更新 ubuntu
apt-get update

4. 安装 mongodb
apt-get install mongodb-org -y

5. 启动 mongodb 服务
service mongod start



配置 robomongo 3t ssh tunnel
把服务器上 /etc/ssh/sshd_config 文件的最后一行改成
KexAlgorithms diffie-hellman-group14-sha1,diffie-hellman-group-exchange-sha256,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group1-sha1,curve25519-sha256@libssh.org
*/
