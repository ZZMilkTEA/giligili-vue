import axios from 'axios';

// 发表评论
const postComment = (form,id,token) => axios.post(`/api/v1/videos/${id}/comments`, form,{headers:{'token':token}}).then(res => res.data);

// 读视频详情
const getVideo = id => axios.get(`/api/v1/videos/${id}`).then(res => res.data);

// 读取视频列表
const listCommentsById = (start, limit, type, id) => axios.get(`/api/v1/${type}s/${id}/comments`, { params: { start, limit, type} }).then(res => res.data);

export {
  listCommentsById,
  getVideo,
  postComment,
};
