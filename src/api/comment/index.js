import axios from 'axios';

// 发表评论
const postComment = (form,id,token) => axios.post(`/api/v1/video/${id}/comments`, form,{headers:{'token':token}}).then(res => res.data);

// 读视频详情
const getVideo = id => axios.get(`/api/v1/videos/${id}`).then(res => res.data);

// 读取视频列表
const listCommentsByVideoId = (start, limit,id) => axios.get(`/api/v1/video/${id}/comments`, { params: { start, limit} }).then(res => res.data);

export {
  listCommentsByVideoId,
  getVideo,
  postComment,
};
