// 设置缓存
function setHistory(song) {
  const obj = {
    name: song.name,
    singer: song.artists[0].name,
    id: song.id,
  };
  // 是否有历史
  const songs = localStorage.getItem('songs');
  if (songs) {
    const songList = JSON.parse(songs);
    songList.unshift(obj); // 添加到头部
    // 搜索历史不超过 15 条，超过就删除
    if (songList.length > 15) {
      songList.splice(songList.length - 1, 1);
    }
    localStorage.removeItem('songs');
    localStorage.setItem('songs', JSON.stringify(songList));
  } else {
    localStorage.setItem('songs', JSON.stringify([obj]));
  }
}

// 删除缓存
function deleteHistory(song) {
  const id = song.id;
  const songList = JSON.parse(localStorage.getItem('songs'));
  const index = songList.findIndex(item => item.id === id);
  if (index > -1) {
    songList.splice(index, 1);
    localStorage.removeItem('songs');
    localStorage.setItem('songs', JSON.stringify(songList));
  }
}

// 读取缓存
function getHistory() {
  const songList = JSON.parse(localStorage.getItem('songs'));
  return songList;
}

// 清空缓存
function deleteAllHistroy() {
  localStorage.removeItem('songs');
}

export default {
  setHistory,
  deleteHistory,
  getHistory,
  deleteAllHistroy,
};
