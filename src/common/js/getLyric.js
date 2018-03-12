import api from '@/api/api';
import axios from 'axios';

function getLyric(id) {
  return axios.get(api.lyric + id)
    .then((res) => {
      if (res.status === 200) {
        return res.data.lrc.lyric;
      }
      return '暂无歌词';
    });
}

export default getLyric;
