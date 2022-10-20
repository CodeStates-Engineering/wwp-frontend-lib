export function uploadFile(file: File, url: string, method: 'put' | 'post' = 'put'): Promise<any> {
  const axios = require('axios').default;
  return axios({
    url,
    method,
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
