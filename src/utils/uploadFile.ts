import axios from 'axios';
export function uploadFile(file: File, url: string, method: 'put' | 'post' = 'put'): Promise<any> {
  return axios({
    url,
    method,
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
