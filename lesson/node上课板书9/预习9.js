本次内容是
----------

- 以前和现在的服务器 (托管和云平台)
- Linux 介绍和使用
- 常用 Linux 版本分析
- 常用工具/概念/使用方式


简介
----

- 为什么服务器多用 Linux?
    - 微软很贵, Linux 免费
    - Linux 生态圈更好

- Linux 的各种版本分析
    - Debian 最稳定
    - Ubuntu 抄的 debian, 用途广泛, 用户多
    - CentOS
    - redhat

- VPS：推荐腾讯云。

- 域名购买：腾讯云。
不推荐 .com .cn 中文域名。
推荐买 .cc 域名

- 终端
    - windows: cmder
    - mac: terminal
    - 终端程序可以运行不同的 Shell (壳)
    - Windows Shell 有 cmd PowerShell
    - Linux/Mac Shell 有 Bash 和 Zsh，我们只学基本的 Bash。Zsh 兼容 Bash。

- ssh sftp
    - 连接服务器
     ssh ubuntu@118.89.179.0
     ssh root@118.89.179.42


- 系统配置
- 程序安装
- PATH
- 命令
- 参数

常用操作
--------

- pwd
    - print working dir
    - 显示现在所处的目录

- ls
    - 不带参数就显示当前目录下的所有文件
    - 程序可以加参数
    - `-l` 显示详细信息
    - `-h` 人性化显示文件尺寸
    - `-a` 显示所有文件， 以 . 开头的文件是隐藏文件
    - 还可以带一个目录当参数，这样就会显示这个目录
    - 下面两个是等价的
        - `ls -l -h`
        - `ls -lh`

- cd
    - cd Desktop
    - 改变当前目录 change directory
    - . 代表当前目录
    - .. 代表上级目录
    - cd 不带参数就回到默认的家目录
    - 每个用户都有一个家目录，默认在 `/home/用户名`
    - root 用户的家目录是 `/root`

- touch
        - `touch a.gua`
        - 如果 a.gua 存在就更新修改时间
        - 如果 a.gua 不存在就创建文件tou

- mkdir
    - 创建一个目录
    - `-p` 可以一次性创建多层目录
    - `mkdir -p a/b/c`


- cp
    - 复制出一个文件，用法如下
    - `cp a.txt b.txt`
    - 复制 a.txt 并把新文件取名为 b.txt
    - 复制目录要加上 -r 参数
    - `cp -r a b`

- rmdir
    - 只能用来删除一个空目录

- rm
    - 这个命令直接删除东西，很危险，一般不要用
    - 删除文件或者目录
    - `-f` 强制删除
    - `-r` 用来删除目录
- mv
    - 移动文件或者文件夹
    - 也可以用来改名
    - `mv a.txt b.txt`
    - `mv b.txt ../`
    - `mv b.txt ../gua.txt`
    - 可以用 `mv xx /tmp` 的方式来将文件放入临时文件夹
    - tmp是操作系统提供的临时文件夹，重启会删除里面的所有文件

- cat
    - 显示文件内容
- tac
    - 反过来显示文件内容
- nl
    - 显示内容并附带行号

- more less head tail
    - more 可以分屏分批看文件内容
    - less 比 more 更高级，可以前后退看文件 q 退出
    - head 可以显示文件的前 10 行
    - tail 可以显示文件的后 10 行
    - head 和 tail 有一个 -n 参数
    - `head -n 20 a.gua`



目录分布
--------

主要如下：

- `/home` 家目录
- `/root` root 用户目录
- `/etc` 放配置文件
- `/tmp` 临时文件
- `/var/log` 日志
- `/bin` binary 命令存放的地方。有好几个 bin，不用理解。
- `/lib` library 库

权限操作
--------

- sudo
    - 用管理员帐户执行程序
    - 比如安装程序或者修改一些系统配置都需要管理员权限
- su
    - switch user， 切换用户
    - `su root` 为了方便操作, 统一选择 root 用户, 也就是说如果你不是用 root 登录，先切换到 root 用户

```
文件权限    文件类型 用户 用户组 文件大小  修改日期     文件名
-rw-rw-r--  1       gua gua     10      11/09 20:28 b.gua
drwxrwxr-x  2       gua gua     4096    11/09 20:28 tmp
```

```
文件类型    是否可读  是否可写  是否可执行
d           r       w           x
-           r       w           x
```

- 三组 rwx 分表代表 所属用户|同组用户|其他用户
- rwx 可以用数字表示为 421
- 于是乎
```
r-- 就是 4
rw- 就是 6
rwx 就是 7
r-x 就是 5
```
```
-rw-rw-r--     文件的访问权限
1              文件的链接数目(这个不用关心)
root           文件所有者的用户名
root           文件所属用户组
10             文件大小（单位是字节）
11/09 20:28    上次修改文件的日期和时间
b.gua          文件名
```

- chown
    - 改变文件的用户
    - `chown gua c.gua`
    - `chown gua:gua c.gua`
- chmod
    - 改变文件权限，不要用数字
    - `chmod 666 root.gua`
    - `chmod +x root.gua`
    - `chmod -x tmp`
    - 修改所属用户权限 `chmod u+x tmp`
    - 修改同组用户权限 `chmod g+x tmp`
    - 修改其他用户权限 `chmod o+x tmp`

drwxr----- 2 root   root 4.0K Jan 22 16:02 data


信息查找
--------

- file
    - 显示文件的类型（不是百分之百准确）
- uname
    - 显示操作系统的名字或者其他信息
    - `uname -r`
    - `uname -a`
- which
    - `which pwd`
    - 显示 pwd 的具体路径
- whereis
    - `whereis ls`
    - 显示更全面的信息
- whoami
- `find . -name ""`

奇怪符号
--------

~   家目录快捷方式
>   覆盖式重定向
>>  追加重定向
|   管道, 很麻烦 以后说
``  获取命令执行的结果
比如 echo pwd 输出的就是 pwd 这个字符串
echo `pwd` 输出的是 pwd 命令执行的结果, 相当于一个变量

&   后台执行
    node server.js &
    可以用 fg 命令把一个在后台的程序拉到前台来
    可以用 Ctrl-z 来把一个前台的程序放到后台去挂起
()  开新的子进程shell执行 (不用掌握这一条, 因为几乎没人用)


其他命令
--------

- history
    - 查看历史命令
- grep
    - 查找
- 这两个一般配合使用
    - `history | grep touch`
- C-r 搜索上一条命令
- ps
    - 查看进程, 一般用下面的用法
    - `ps ax`
    - `ps ax | grep node`
    - 查看带 node 字符串的进程

- kill 和 killall 杀进程
    - 用 `ps ax` 找到进程id (pid)
    - 普通杀： `kill [pid]` / `kill -15 [pid]` / `kill -TERM [pid]`
    - 强制杀： `kill -9 [pid]` / `kill -KILL [pid]`
    - 先用 `kill` 再用 `kill -KILL`，不要用带数字的
    - killall 是用进程名字来杀进程

- 后台前台
    - fg
    - jobs

- 快捷键
    - C-z 挂起到后台
    - C-c C-d 中断程序

- reboot
    - 重启
- shutdown
    - 关机
    - 可以用参数指定时间
- halt
    - 关机




ssh-key 的概念和使用
--------------------

```
# 1. 生成 ssh id_rsa.pub
ssh-keygen
Mac 用户直接打开终端输入命令
Win 打开 cmder 程序, 在里面输入下面的命令

1. 在本机生成 ssh key 公钥私钥
注意 下面的 mykey 随便换一个你喜欢的名字, 这是一个标注, 方便你看的
ssh-keygen -C <mykey>
会提示你生成的文件的地址, 并且让你输入密码, 你不要输入密码, 直接回车

这样你就得到了一对 ssh-key, 这是用于登录服务器用的
默认你会得到两个文件
id_rsa 是私钥 自己保存 不要给别人看
id_rsa.pub 是公钥, 是要到处使用的
这个是我们之前提到的非对称加密


# 2. 普通用户把 public key 添加到 ~/.ssh/authorized_keys
##  root用户把 public key 添加到 /root/.ssh/authorized_keys

# 3. 重启 ssh
service ssh restart
```


软件安装
--------
`apt-get install 软件名`
比如下面
`apt-get install ufw`


安装防火墙 和 防火墙的基本套路配置
----------------------------------
- 防火墙的作用(redis安全漏洞)

```
apt-get install ufw
ufw allow 22
ufw allow 80
ufw allow 443
ufw default deny incoming
ufw default allow outgoing
ufw status verbose
ufw enable
```


Shell 设置
-----------

1. 装 zsh `sudo apt-get install zsh`
2. 装 oh-my-zsh
`wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh`



部署项目
软件安装
====
安装 git nginx
`apt-get install git nginx`

ubuntu 的软件仓库中的 nodejs 更新很慢, 几乎可以认为不可用,
所以我们从 nodeSource 仓库中安装新款 nodejs

配置 nodeSource 仓库
`curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -`

配置之后就可以安装最新的 nodejs
`sudo apt-get install -y nodejs`

安装 yarn
`npm install yarn -g`

安装依赖
`yarn install`

配置 nginx
`ln -s /var/www/weibo/weibo.nginx /etc/nginx/sites-enabled/weibo`

列出 nginx/sites-enabled 下面的文件
`root@linlab:~# ls -l /etc/nginx/sites-enabled/`

第一个字母是 l, 这个表示 weibo 是一个软链接, 当访问 weibo 时,
实际上访问的是 /var/www/weibo/weibo.nginx
这样做的好处是我们只需要更新 weibo.nginx 就可以
软链接类似 windows 下的快捷方式
```
lrwxrwxrwx 1 root root 26 May 23 14:09 weibo -> /var/www/weibo/weibo.nginx
```

移除默认的配置文件
`mv /etc/nginx/sites-enabled/default /tmp`
`mv /etc/nginx/sites-available/default /tmp`


重启 nginx
`service nginx restart`

运行程序
`yarn run start`

安装 pm2
`yarn global add pm2`

pm2 日志
`$HOME/.pm2/logs` 文件夹会包含所有应用的日志

实时日志命令
`pm2 logs`


// ===
// 服务器中文编码问题
// ===
//
// 编辑下面的文件, 不要拼错
nano /etc/environment
// 加入下面的内容, 保存退出
LC_CTYPE="en_US.UTF-8"
LC_ALL="en_US.UTF-8"
*/

