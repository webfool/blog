---
title: gitalk接入github流程分析
date: '2019/3/15 15:05:00'
tag:
  - gitalk
  - github
  - OAuth
meta:
  -
    name: description
    content: gitalk接入github流程分析
  -
    name: keywords
    content: gitalk github OAuth
---
1、介绍gitalk接入github流程;
2、介绍github OAuth2.0 第三方认证
<!-- more -->
[[toc]]
### gitalk 功能
* 拉取评论
* github 第三方授权
* 添加评论

### gitalk 配置
``` js
const gitalk = new Gitalk({
  clientID: 'GitHub Application Client ID',
  clientSecret: 'GitHub Application Client Secret',
  repo: 'GitHub repo',
  owner: 'GitHub repo owner',
  admin: ['GitHub repo owner and collaborators, only these guys can initialize github issues'],
  id: location.pathname,      // Ensure uniqueness and length less than 50
  distractionFreeMode: false  // Facebook-like distraction free mode
})

gitalk.render('gitalk-container')
```

### 流程
- 初次进入文章

通过labels判断issues是否存在接口
``` js
GET https://api.github.com/repos/{github用户名}/{仓库repo}}/issues?labels=Gitalk,V | Mr.liu&t=1552577167545
```
如果返回为空[], 那么代表issues不存在；否则取数组第一项的number字段，代表issues编号，再通过 issues编号取评论

||已创建issues|未创建issues|
|-|-|-|
|仓库所有者|展示评论列表|初始化issues
|未登录或其他github用户|展示评论列表|提示issues未创建


- 初次登录，跳转github第三方登录接口
> 第三方登录的目的是为了拿到用户令牌token,用于每次请求时放在header中，从而拥有用户权限

1、【回调链接设为主页链接】github 申请OAuth App，作为github认证的客户端；定义回调链接（关键），用户授权成功后，将授权成功code码拼接给回调链接，最后重定向到回调链接
```
新建OAuth App -->  https://github.com/settings/developers
```
![](https://note.youdao.com/yws/public/resource/1291f7fdd8952de2e3dd21da82a26372/xmlnote/D3167432369E4E91A7760CC992B6F69A/23010)

2、gitalk配置中有clientId, clientSecret 两个参数，即代表auth app申请成功后的 Client Id、 Client Secret

gitalk跳转github第三方认证网站，在链接后面带上client_id 和 redirect_url
::: tip
这里需要注意，此时的redirect_uri 会覆盖client_id  在github 客户端定义的回调url
:::
```
注意这个链接的client_id 和redirect_uri

https://github.com/login?client_id=9ba5da4b7d2622fa3df1&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D9ba5da4b7d2622fa3df1%26redirect_uri%3Dhttps%253A%252F%252Fwebfool.github.io%252Fblob%252Fh5%252F%26scope%3Dpublic_repo
```

3、用户输入账号密码，代表允许第三方认证,github 重定向redirect_url 或callback url 页面，并将认证code拼接在url之后
```
http://localhost:8888/oauth/github/callback?code={code}&state={state}
```
4、gitalk 通过code再去请求github，获取用户的身份令牌token
```
POST https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token

{
    client_id: "xxx",
    client_secret: "xxx",
    code: "xxxx"
}
```

5、gitalk 之后的请求会将token 放在请求头部header 的token 中，从而拥有该用户的权限
```
请求头 header：
    Authorization: bearer ff51e3c028cbc648cd6df7390fb0fea3ff846de6
```

- 以用户身份进行issues评论
```
POST https://api.github.com/repos/{github用户名}/{仓库名repo}/issues/{issues id}/comments

{
    body: '评论内容'
}
```