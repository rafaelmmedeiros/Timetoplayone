import axios, { AxiosResponse } from "axios";
import { IGrupo } from "../models/grupo";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IProfile, IPhoto } from "../models/profile";

axios.defaults.baseURL = "http://localhost:5000/api";

// TODA VEZ que fizer um REQUEST SERÁ VERIFICADO SE TEM O TOKEN E ANEXAR ELE AO HEADER
// IGUAL NO POSTMAN... FUNCIONOU TA BOM.
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ERROR INTERCEPTOR
axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("NETWORK ERROR - VEJA SE A API ESTÀ RODANDO");
  }

  const { status, data, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }
  if (error.response.status === 400 && config.method === "get" && data.errors.hasOwnProperty("id")) {
    history.push("/notfound");
  }

  // TOASTS
  if (status === 500) {
    toast.error("SERVER ERROR!");
  }

  throw error.response;
});

// TODO: DELAY - TIRAR EM PRODUÇÃO
let time = 500;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url: string) => axios.get(url).then(sleep(time)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(time)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(time)).then(responseBody),
  delete: (url: string) => axios.delete(url).then(sleep(time)).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content.type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Grupos = {
  list: (): Promise<IGrupo[]> => requests.get("/grupos"),
  details: (id: string) => requests.get(`/grupos/${id}`),
  create: (grupo: IGrupo) => requests.post("/grupos", grupo),
  update: (grupo: IGrupo) => requests.put(`/grupos/${grupo.id}`, grupo),
  delete: (id: string) => requests.delete(`/grupos/${id}`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user),
};

const Profiles = {
  get: (username: string): Promise<IProfile> => requests.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setmain`, {}),
  deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
};

export default {
  Grupos,
  User,
  Profiles,
};
