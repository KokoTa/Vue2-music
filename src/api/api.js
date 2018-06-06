const api = {
  banner: '/api/banner', // 轮播图
  recommend: '/api/top/playlist/highquality', // 推荐歌单(20个)
  singer: '/api/top/artists', // 热门歌手
  singerSongs: '/api/artists?id=', // 歌手歌曲信息集合（没有歌曲连接）
  songInfo: '/api/music/url?id=', // 歌曲连接
  lyric: '/api/lyric?id=', // 歌词
  getRecommendDetail: '/api/playlist/detail?id=', // 获取歌单详情
  getRankData: '/api/top/list?idx=', // 获取排行榜数据(idx值范围：0 ~ 23)
  search: '/api/search?keywords=', // 搜索(limit：返回数量；ype：搜索类型)
  hotSinger: '/api/top/artists?offset=0&limit=10', // 热门歌手
};

export default api;
