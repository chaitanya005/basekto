import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getRequest(URL) {
  const response = await axiosClient.get(`${URL}`);
  return response;
}

// export async function postRequest(url) {
//   const response = await axiosClient.post(`${URL}`);
//   return response;
// }
