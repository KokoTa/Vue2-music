// 设置缓存
function setHistory(song, localStorageName = 'songs') {
  console.log(song);
  const obj = {
    name: song.name ? song.name : song.songName,
    singer: song.artists ? song.artists[0].name : song.singerName,
    id: song.id,
  };
  // 是否有历史
  const songs = localStorage.getItem(localStorageName);
  if (songs) {
    const songList = JSON.parse(songs);

    // 是否存在相同历史信息，存在就不添加
    const exist = songList.some(item => item.id === obj.id);
    if (exist) return;

    songList.unshift(obj); // 添加到头部
    // 搜索历史不超过 30 条，超过就删除
    if (songList.length > 30) {
      songList.splice(songList.length - 1, 1);
    }
    localStorage.removeItem(localStorageName);
    localStorage.setItem(localStorageName, JSON.stringify(songList));
  } else {
    localStorage.setItem(localStorageName, JSON.stringify([obj]));
  }
}

// 删除缓存
function deleteHistory(song, localStorageName = 'songs') {
  const id = song.id;
  const songList = JSON.parse(localStorage.getItem(localStorageName));
  const index = songList.findIndex(item => item.id === id);
  if (index > -1) {
    songList.splice(index, 1);
    localStorage.removeItem(localStorageName);
    localStorage.setItem(localStorageName, JSON.stringify(songList));
  }
}

// 读取缓存
function getHistory(localStorageName = 'songs') {
  const songList = JSON.parse(localStorage.getItem(localStorageName));
  return songList;
}

// 清空缓存
function deleteAllHistroy(localStorageName = 'songs') {
  localStorage.removeItem(localStorageName);
}

export default {
  setHistory,
  deleteHistory,
  getHistory,
  deleteAllHistroy,
};
