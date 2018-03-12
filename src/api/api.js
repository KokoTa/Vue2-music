const api = {
  banner: '/api/banner', // 轮播图
  recommend: '/api/top/playlist/highquality', // 推荐歌单(20个)
  singer: '/api/toplist/artist', // 热门歌手
  singerSongs: '/api/artists?id=', // 歌手歌曲信息集合（没有歌曲连接）
  songInfo: '/api/music/url?id=', // 歌曲连接
  lyric: '/api/lyric?id=', // 歌词
};

export default api;
