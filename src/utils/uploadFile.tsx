export function uploadFile(file: File, url: string, method: 'put' | 'post' = 'put'): Promise<any> {
  const data = new FormData();
  data.append('file', file);
  const axios = require('axios').default;
  return axios({
    url,
    method,
    data,
  });
}
