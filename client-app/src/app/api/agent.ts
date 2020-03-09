import axios, { AxiosResponse } from "axios";
import { IGrupo } from "../models/grupo";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";

axios.defaults.baseURL = "http://localhost:5000/api";

// ERROR INTERCEPTOR
axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("NETWORK ERROR - VEJA SE A API ESTÀ RODANDO");
  }

  const { status, data, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }
  if (
    error.response.status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }

  // TOASTS
  if (status === 500) {
    toast.error("SERVER ERROR!");
  }

  throw error;
});

// DELAY - TIRAR EM PRODUÇÃO
let time = 500;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(time))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(time))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(time))
      .then(responseBody),
  delete: (url: string) =>
    axios
      .delete(url)
      .then(sleep(time))
      .then(responseBody)
};

const Grupos = {
  list: (): Promise<IGrupo[]> => requests.get("/grupos"),
  details: (id: string) => requests.get(`/grupos/${id}`),
  create: (grupo: IGrupo) => requests.post("/grupos", grupo),
  update: (grupo: IGrupo) => requests.put(`/grupos/${grupo.id}`, grupo),
  delete: (id: string) => requests.delete(`/grupos/${id}`)
};

const User = {
  current: (): Promise<IUser> => requests.get('/user'),
  login: (user: IUserFormValues): Promise<IUser> =>requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>requests.post(`/user/register`, user),
}

export default {
  Grupos,
  User
};
