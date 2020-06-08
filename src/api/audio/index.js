import axios from 'axios';

// 创建音频
const postAudio = (form,token) => axios.post('/api/v1/audios', form,{headers:{'token':token}}).then(res => res.data);

// 读音频详情
const getAudio = id => axios.get(`/api/v1/audios/${id}`).then(res => res.data);

// 读取音频列表
const listPassedAudios = (start, limit) => axios.get('/api/v1/passed-audios', { params: { start, limit } }).then(res => res.data);

// 读取用户音频列表
const listMyPassedAudios = (start, limit, id) => axios.get(`/api/v1/users/${id}/passed-audios`, { params: { start, limit } }).then(res => res.data);

export {
  listPassedAudios,
  listMyPassedAudios,
  getAudio,
  postAudio,
};
