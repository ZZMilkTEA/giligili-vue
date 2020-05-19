import axios from 'axios';

// 读视频详情
const postUploadToken = (fileName,token) => axios.post('/api/v1/upload/token', { filename: fileName },{headers:{'token':token}}).then(res => res.data);

export {
  postUploadToken,
};
