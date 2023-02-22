# 个人博客搭建-day2-GitHub_Action基本配置



最近因为自己的服务器重新搭建了，就想把一些好用的东西全部都用起来，就比如现在搞的这个**GitHub Action**自动化部署过功能。在这之前我就自己去尝试用过`github`上面的一个`webhooks`的钩子的工具，用于监听代码的push，从而实现远程服务器上的项目更新并打包，但是这总方法总的来时还是比较繁琐的，需要用`pm2`一直运行并监听端口，所以这次就打算使用**github action**来实现代码的自动化部署。



## 1. 选取或新建一个项目



## 2. 点击Actions

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2ll2u771xj20z80ia40d.jpg)

点击`actions`后会出现让你选择支持的服务，比如我这边是一个前端项目，我就选择`node.js`

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2ll4r1gzbj21b60lnq59.jpg)

选择完构建工具后，就会在项目的根目录下生成一个`.github/workflows/node.js.yml`的文件，它默认会提供给你一个模版。

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2ll999wk9j21g30km0w9.jpg)

这个时候我们可以根据自己的需求去修改里面的内容。



## 3. 了解yml文件中各个字段的含义和其作用。

有权威点的可以先参考[**阮一峰 GitHub Actions入门教程**](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)，了解一下Github Action。

+ 我们来看看Github Action配置文件的基本构成，配置文件格式是`.yml`，示例如下：

  ```yaml
  # main.yml
  # 一个 workflow，名字为Github Action Example
  name: Github Action Example
  
  # 触发 workflow 的事件
  on:
    push:
      # 分支随意
      branches:
        - master
  
  # 一个workflow由执行的一项或多项job
  jobs:
      # 一个job任务，任务名为build
      build:
          # runs-on 指定job任务运行所需要的虚拟机环境(必填字段)
          runs-on: ubuntu-latest
          # steps是每个Job的运行步骤，可以包含一个或多个步骤
          steps:
              # action命令，切换分支获取源码
              - name: Checkout
                  # 使用action库  actions/checkout获取源码
                  uses: actions/checkout@master
              # action命令，安装Node10
              - name: use Node.js 10
                  # 使用action库  actions/setup-node安装node
                  uses: actions/setup-node@v1
                  with:
                      node-version: 10
              # action命令，install && test
              - name: npm install and test
                  # 运行的命令或者 action
                  run: |
                      npm install
                      npm run test
                  # 环境变量
                  env:
                      CI: true
  ```

  > + **Action**是工作流中最小的可移植构建块。你可以创建自己的动作，使用从[GitHub社区共享的action库 (opens new window)](https://github.com/marketplace?utf8=✓&type=actions&query=deploy)，以及自定义公共action库。
  
  > + **Step**是Job执行的一组任务。Job中的每个步骤都在同一运行程序中执行，从而允许该Job中的操作使用文件系统共享信息，Step可以运行命令或action。
  
  > + **Job**由Step构成。你可以定义工作流文件中Job的运行方式的依赖关系规则。Job可以同时并行运行，也可以依赖于先前Job的状态依次运行。
  
  > + **Workflow**由一个或多个Job组成，可以通过[事件 (opens new window)](https://help.github.com/cn/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows)进行计划或激活。你可以在存储库中设置一个可配置的自动化过程，以在GitHub上构建，测试，打包，发布或部署任何项目。



## 4.编写自己的yml文件，让项目放置到阿里云ESC服务器上

参考如下

```yaml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

# 触发workflow的条件
name: Node.js CI

on:
  push:
    # 只有master分支发生push事件时，才会触发workflow
    branches: [ master ]
  pull_request:
    branches: [ master ]

# jobs表示执行的一项或多项任务
jobs:
 # 任务的job_id，具体名称自定义，这里build代表打包
  build:
    # runs-on字段指定运行所需要的虚拟机环境。注意：这个是必填字段
    runs-on: ubuntu-latest
    steps:
        - uses: actions/checkout@master
        - uses: actions/setup-node@v1
          with:
                node-version: v14.17.0 # 选择node版本
                
        # 装依赖
        - name: Install
          run: yarn
          
        # 打包
        - name: Build
          run: yarn build
          
        #上传打包资源
        - name: Deploy
          uses: easingthemes/ssh-deploy@main
          env:
              # 服务器SSH私钥
              SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
              ARGS: "-rltgoDzvO"
              SOURCE: "dist/"
              # 服务器IP地址
              REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
              # 服务器用户名
              REMOTE_USER: ${{ secrets.REMOTE_USER }}
              # 上传文件存放地址
              TARGET: /www/wwwroot/www.admin.littlesmart3.top/dist/
              EXCLUDE: "/dist/, /node_modules/"


```

主要的重点模块是`Deploy`,它的作用就是使用`shh`连接到远程服务器，再通过私钥进行身份验证把上面打包好的dist文件放置到服务器对应的文件夹下面。





### 5. 新增`actions secrets`

上面步骤四的yml文件中，我们可以发现在上传打包资源步骤中有三个样子为`${{ secrets.XXXXX }}`的字段，它的作用是用来加密一些参数，从而起到保护的作用，比如服务器SSH私钥和IP地址。下面我们就往项目中添加这个3个字段。

新增一个网页打开我的项目，点击项目中的`setting`-->`Secret`-->`Actions`-->`New repository secret`

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2lm9eg3ffj20rw0m0mzk.jpg)

点击完成后后让你填写 `KEY` 和 `VALUE`，这个时候就可以把上面的三个变量填进去。

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2lmbw7r1xj20is0dlgm1.jpg)

+ REMOTE_HOST：服务器IP地址，这个就看自己的服务器的外网IP就好了，如：`192.168.0.1`

+ REMOTE_USER：服务器用户名，一般都为`root`

+ SSH_PRIVATE_KEY: 服务器的私钥，自行获取，不了解的可以看文章最下面的拓展。

  

  添加完后效果如图

  ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2lmlh6celj20iv077q36.jpg)



## 6. 生成一个commit查看构建结果

以上步骤都完成后，我们返回步骤四的页面点击右上角的`Start commit`-->`Commit new file`

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2lmq0v9uvj20s60gb40j.jpg)



完成后我们就可以点击Actions模块查看项目构部署的进度。

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2lmtyeat7j22ae0tcwgu.jpg)



该文章是构建静态网页的，之后会更新如Next.js的SSR服务器渲染项目的自动化部署。



## 遇到的问题：

在搞这个自动化部署的时候遇到了很多的问题

+ 1.在进行Deploy步骤的时候报了这个错：`⚠️ [Rsync] stderr:  Warning: Permanently added '***' (ECDSA) to the list of known hosts`。出现这个问题的原因就是`SSH_PRIVATE_KEY`字段的服务器SSH私钥没有配对，我拿取了服务器的SSH公钥，所以一直报着个错。如何获取参考下面的拓展。

  ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2lmvetgrbj21ai0u0aey.jpg)





## 拓展：获取服务器SSH私钥

### 1. 生成新的SSH key

如果存在可以忽略掉这一步

```shell
ssh-keygen -t rsa -C "your_email@example.com"
```



### 2. 输入passphrase(密码:某些网站clone时需要密码)（本步骤可以一直按enter键跳过）

设置passphrase后，进行版本控制时，每次与GitHub通信都会要求输入passphrase，以避免某些“失误”可不填。



### 3. 查看SSH keys

检查是否已创建了`SSH keys`

```shell
cat ~/.ssh/id_rsa.pub
```



### 4. 服务器上安装公钥 

```shell
cd .ssh
cat id_rsa.pub >> authorized_keys # 将公钥导入到“authorized_keys”文件
```



### 5. 为了确保连接成功，请保证以下文件权限

```shell
chmod 600 authorized_keys
chmod 700 ~/.ssh

## 最后重启ssh服务
service sshd restart
```



### 6.获取私钥的内容

重启完ssh服务后我们再次打开.shh文件夹。

```shell
cd .ssh
ll
```

当你输入`ll`的时候你可以看到下面这样的目录结构

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2lnh2ab39j211q07uab1.jpg)

```shell
vi id_rsa
```

复制内部的私钥文本（注意：全部复制，包括`BEGIN`和`END`）,将它放到`SSH_PRIVATE_KEY`字段中。



### 参考：

[GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

[Github Action 部署项目到服务器](https://juejin.cn/post/7066689008146841636)


