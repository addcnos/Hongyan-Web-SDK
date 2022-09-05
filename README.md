## 数睿鸿雁SDK Web文档
![LICENSE](https://img.shields.io/badge/License-MIT-orange)
![Language](https://img.shields.io/badge/Language-TypeScript-blue.svg)
![Stable](https://img.shields.io/badge/Stable-v1.0.0-brightgreen.svg)

#### SDK概述
鸿雁即时通讯是数睿科技公司旗下的一款专注于为开发者提供实时聊天技术和服务的产品。我们的团队来自数睿科技，致力于为用户提供高效稳定的实时聊天云服务，且弹性可扩展，对外提供较为简洁的API接口，让您轻松实现快速集成即时通讯功能。

#### 环境依赖

SDK 兼容主流浏览器(不支持IE)

## 集成流程

#### 1.引入SDK

方法一：使用npm包:

```
npm i @addcnos/hongyan-web-sdk
```

方法二：直接引用js:

在项目中直接导入 dist/im.js

#### 2.初始化SDK

```js
// 初始化SDK
let  im = new IM({wssUrl:_wssUrl,url:_httpUrl}); //wssUrl：websocket服务域名，url：im接口域名
```

#### 3.消息接收监听

```js
//websocket连接成功
im.on('ready',function(){
});

//websocket异常
im.on('error',function(){
});

//websocket消息通知
im.on('message',function(){
});

//连接websocket服务
im.connect({token:_token});
```

## 方法说明

#### 1.发送消息

```js
//发送消息
im.sendMessage({conversationID: _conversationID;type: _type;content:_content;push:_push})
```
| 参数        | 类型    |  说明  |
| --------   | -----:  | :----: |
| conversationID         | String        |   聊天目标id    |
| type           | String        |   消息的类型   |
| content      | String        |   消息的内容   |
| push        | Number        |   是否进行推送（默认为0，不推送）   |

#### 2.获取聊天列表

```js
//获取聊天列表
im.getConversationList({count: _count;page: _page})
```
| 参数        | 类型    |  说明  |
| --------    | -----:  | :----: |
| count       | Number        |   查询条数      |
| page   | Number        |   页数     |


#### 3.获取历史消息

```js
//拉取历史消息
let msgList = im.getMessageList({conversationID:this.targetId});
msgList.next();
```
| 参数        | 类型    |  说明  |
| --------    | -----:  | :----: |
| conversationID   | String        |   聊天目标id     |


#### 4.发送消息已读

```js
//发送消息已读
im.setMessageRead({conversationID:_conversationID})
```
| 参数        | 类型    |  说明  |
| --------    | -----:  | :----: |
| conversationID   | String        |   聊天目标id     |


#### 5.获取未读消息数

```js
//获取所有的新消息数
im.getUnreadCount()
```


#### 6.获取会员信息

```js
//获取会员信息
im.getProfile({conversationID:_conversationID})
```
| 参数        | 类型    |  说明  |
| --------    | -----:  | :----: |
| conversationID   | String        |   聊天目标id     |


#### 7.删除联络人

```js
//删除联络人
im.deleteConversation({conversationID:_conversationID})
```
| 参数        | 类型    |  说明  |
| --------    | -----:  | :----: |
| conversationID   | String        |   聊天目标id     |


#### 8.发送图片

```js
//上传图片
im.uploadImage(file)
```
| 参数        | 类型    |  说明  |
| --------    | -----:  | :----: |
| file        | file    |   图片文件流     |


## 版本更新说明
#### v1.0.0 版本（最新）

更新日期：2022年8月30日<br>
1.web sdk基础功能


## 相关资料

#### [数睿鸿雁后端服务文档](https://github.com/addcnos/Hongyan-Server)
#### [数睿鸿雁SDK-flutter文档](https://github.com/addcnos/Hongyan-Flutter-SDK)
#### [数睿鸿雁SDK-Android文档](https://github.com/addcnos/Hongyan-Android-SDK)
#### [数睿鸿雁SDK-Objective-C文档](https://github.com/addcnos/Hongyan-IOS-SDK)
#### [数睿鸿雁SDK-Web文档](https://github.com/addcnos/Hongyan-Web-SDK)
