const api = {
  banner: 'http://ms.kokota.cn/banner', // 轮播图
  recommend: 'http://ms.kokota.cn/top/playlist/highquality', // 推荐歌单(20个)
  singer: 'http://ms.kokota.cn/top/artists', // 热门歌手
  singerSongs: 'http://ms.kokota.cn/artists?id=', // 歌手歌曲信息集合（没有歌曲连接）
  songInfo: 'http://ms.kokota.cn/music/url?id=', // 歌曲连接
  lyric: 'http://ms.kokota.cn/lyric?id=', // 歌词
  getRecommendDetail: 'http://ms.kokota.cn/playlist/detail?id=', // 获取歌单详情
  getRankData: 'http://ms.kokota.cn/top/list?idx=', // 获取排行榜数据(idx值范围：0 ~ 23)
  search: 'http://ms.kokota.cn/search?keywords=', // 搜索(limit：返回数量；ype：搜索类型)
  hotSinger: 'http://ms.kokota.cn/top/artists?offset=0&limit=10', // 热门歌手
};

export default api;
