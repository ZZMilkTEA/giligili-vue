import axios from 'axios';

// 发表评论
const postComment = (form,id,token) => axios.post(`/api/v1/videos/${id}/comments`, form,{headers:{'token':token}}).then(res => res.data);

// 通过媒体类型和Id读取评论列表
const listCommentsByMediaId = (start, limit, type, id) => axios.get(`/api/v1/${type}s/${id}/comments`, { params: { start, limit, type} }).then(res => res.data);

export {
  listCommentsByMediaId,
  postComment,
};
