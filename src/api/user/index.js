import axios from 'axios';

// 用户登录
const userLogin = form => axios.post('/api/v1/login', form).then(res => res.data);

// 用户注册
const userRegister = form => axios.post('/api/v1/user', form).then(res => res.data);

// 用户登出
const userLogout = user => axios.get('/api/v1/logout').then(res => res.data);

//获取用户信息
const userGetInfo = id => axios.get(`/api/v1/user/${id}`).then(res => res.data);

//获取登陆用户信息
const userTokenGetInfo = token => axios.get('/api/v1/verify',{headers:{'token':token}}).then(res => res.data);

export {
  userLogin,
  userLogout,
  userGetInfo,
  userRegister,
  userTokenGetInfo,
};
