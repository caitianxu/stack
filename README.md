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
1. /api/web/org/list 研究机构列表接口 差一个模糊搜索字段
2. /api/web/expert/list 专家列表接口差一个研究领域分页接口
3. 专家列表接口 的  org_name/所属单位（模糊查询）  这个模糊搜索是什么意思？ 是代表列表的搜索关键词吗？ 
4. 专家列表接口差一个name筛选条件
5. 二级页面的左侧筛选条件列表都有一个全部 按钮，这个能不能去掉， 因为有很多筛选条件数据都非常多 几百条。资格要一次性加载出来数据就太多了些。