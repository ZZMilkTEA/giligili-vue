import axios from 'axios';

// 创建视频
const videoDailyRank = () => axios.get('/api/v1/rank/videos/daily').then(res => res.data);

const audioDailyRank = () => axios.get('/api/v1/rank/audios/daily').then(res => res.data);


export {
  videoDailyRank,
  audioDailyRank,
};
