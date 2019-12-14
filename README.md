## 新增组件

### node-sass  样式文件
### qrcode-react  二维码
### qs 解码方式
### react-router-dom 路由
### react-scrollbars-custom 滚动条
### antd ui框架
### axios 数据请求
### core-js 兼容JS
### babel-plugin-import 动态加载组件
### fetch-jsonp jsop请求组件

## 1、环境准备  
nodeJs安装、git安装

## 2、项目拉取
git clone https://github.com/caitianxu/stack.git

### 本地还原
git fetch --all 
git reset --hard origin/master
git pull

### 3、初始化
npm install

## 本地运行
npm start

## 编译打包
npm run build

## nginx 服务器配置
location / {
  try_files $uri $uri/ /index.html;
}

## 服务端设置
response.setHeader("Access-Control-Allow-Origin", "*");    
response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");    
response.setHeader("Access-Control-Max-Age", "0");    
response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-requested-with, Content-Type, Accept, token");  


## 问题
1.




1. 收藏差一个批量收藏
2. 政策列表登录后就查不出数据了
3. 政策列表差排序条件
4. 图书列表差排序条件
5. 图片地址的域名送多少
6. 图书详情接口，内容与设计图差异太多。 返回的属性不全， 返回属性有空格，也与文档不一致。