import axios from 'axios';

// 创建视频
const postReport = (form, token) => axios.post(`/api/v1/reports`, form,{headers:{'token':token}}).then(res => res.data);

export{
  postReport
}
