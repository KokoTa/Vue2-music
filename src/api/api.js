const api = {
  banner: '/api/banner', // 轮播图
  recommend: '/api/top/playlist/highquality', // 推荐歌单(20个)
  singer: '/api/toplist/artist', // 热门歌手
  singerSongs: '/api/artists?id=', // 歌手歌曲信息集合（没有歌曲连接）
  songInfo: '/api/music/url?id=', // 歌曲连接
  lyric: '/api/lyric?id=', // 歌词
  getRecommendDetail: '/api/playlist/detail?id=', // 获取歌单详情
  getRankData: '/api/top/list?idx=', // 获取排行榜数据(idx值范围：0 ~ 23)
};

export default api;
