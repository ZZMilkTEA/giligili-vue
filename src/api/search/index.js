import axios from 'axios';

// 搜索
const doSearch = (keyword, start, limit, searchType) => axios.get('/api/v1/search',
  { params: {keyword, start, limit, searchType}}).then(res => res.data);

export {
  doSearch,
}
