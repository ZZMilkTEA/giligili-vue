import axios from 'axios';

// 创建视频
const postVideo = (form,token) => axios.post('/api/v1/videos', form,{headers:{'token':token}}).then(res => res.data);

// 读视频详情
const getVideo = id => axios.get(`/api/v1/videos/${id}`).then(res => res.data);

// 读取视频列表
const listPassedVideos = (start, limit, params) => axios.get('/api/v1/passed-videos', { params: { start, limit, kind: params.kind } }).then(res => res.data);

// 读取用户视频列表
const listMyPassedVideos = (start, limit, id) => axios.get(`/api/v1/users/${id}/passed-videos`, { params: { start, limit } }).then(res => res.data);

export {
  listPassedVideos,
  listMyPassedVideos,
  getVideo,
  postVideo,
};
