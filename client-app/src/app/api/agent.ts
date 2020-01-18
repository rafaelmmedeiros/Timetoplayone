import axios, { AxiosResponse } from 'axios';
import { IGrupo } from '../models/grupo';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url: string) => axios
    .get(url)
    .then(sleep(1000))
    .then(responseBody),
  post: (url: string, body:{}) => axios
    .post(url, body)
    .then(sleep(1000))
    .then(responseBody),
  put: (url: string, body:{}) => axios
    .put(url, body)
    .then(sleep(1000))
    .then(responseBody),
  delete: (url: string) => axios
    .delete(url)
    .then(sleep(1000))
    .then(responseBody)
}

const Grupos = {
  list: (): Promise<IGrupo[]> => requests.get('/grupos'),
  details: (id: string) => requests.get(`/grupos/${id}`),
  create: (grupo: IGrupo) => requests.post('/grupos', grupo),
  update: (grupo: IGrupo) => requests.put(`/grupos/${grupo.id}`, grupo),
  delete: (id: string) => requests.delete(`/grupos/${id}`)
}

export default {
  Grupos
}