# vue2-music

> Vue + 网易云API + Node = 在线App

> 每每打开网易云，我就心流涌动。很久以前就打算写一个音乐类型的APP了，到现在才完成，也真的是体现了懒癌的本质了:no_mouth:

## 介绍
1. 项目数据获取依托于[网易云API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)，实现了 **推荐页、歌手页、推荐页、搜索页**。
2. 项目使用了一些第三方插件，比如： **fastclick、better-scroll、vue-lazyload**等。
3. 自主实现了一些特定功能，比如： **歌词分析、轮播图、顶栏固定、侧边栏滑动跳转、信息本地缓存、样式前缀设置、随机函数**等。
4. 学习了Vue的一些知识，比如： **混合、规范化**等。

## 项目结构

```bash
├─api                         // API文件，使用了代理
├─base                        // 基础组件
│  ├─listview                   // 歌手页组件
│  ├─loading                    // loading组件
│  ├─progress-bar               // 进度条组件
│  ├─progress-circle            // 进度环组件
│  ├─scroll                     // 滚动组件
│  ├─search-box                 // 搜索页搜索框组件
│  ├─search-history-list        // 搜索页搜索历史记录组件
│  ├─search-result              // 搜多页搜索结果组件
│  ├─slider                     // 轮播图组件
│  └─song-list                  // 音乐列表子组件
├─common                      // 通用文件
│  ├─icon                       // 图标
│  ├─image                      // 图片
│  ├─js                         // 封装、混合等
│  └─style                      // 样式
├─components                  // 大组件
│  ├─disc-detail                // 专辑详情
│  ├─m-header                   // 标题头组件
│  ├─m-tab                      // 标签组件
│  ├─music-list                 // 音乐列表组件
│  ├─play-list                  // 播放列表组件
│  ├─player                     // 播放器组件
│  ├─rank                       // 排行页
│  ├─rank-detail                // 排行详情
│  ├─recommend                  // 推荐页
│  ├─search                     // 搜索页
│  ├─singer                     // 歌手页
│  ├─singer-detail              // 歌手音乐列表
│  └─user                       // 我喜爱的音乐
├─router                      // 路由管理
└─store                       // 状态管理
```

## 在线预览
[点我点我！](http://vm.kokota.cn/#/recommend)  
PS：最好在移动端访问哟~
