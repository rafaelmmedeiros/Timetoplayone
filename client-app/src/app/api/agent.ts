import axios, { AxiosResponse } from "axios";
import { IGrupo } from "../models/grupo";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IProfile, IPhoto } from "../models/profile";
import { IUserLore } from "../models/appTrainer/userLore";
import { IUserCollection } from "../models/appTrainer/userCollection";
import { ITome } from "../models/appTrainer/domain/tome";
import { IEtude } from "../models/appTrainer/domain/etude";
import { IUserPractice } from "../models/appTrainer/userPractice";
import { IChapter } from "../models/appTrainer/domain/chapter";
import { IUserChaptersWeek } from "../models/appTrainer/userChaptersWeek";
import { IUserChaptersMonth } from "../models/appTrainer/userChaptersMonth";
import { IBrief } from "../models/appTrainer/domain/brief";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// TODA VEZ que fizer um REQUEST SERÁ VERIFICADO SE TEM O TOKEN E ANEXAR ELE AO HEADER
// IGUAL NO POSTMAN... FUNCIONOU TA BOM.


axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");

    if (token) 
      config.headers.Authorization = `Bearer ${token}`;
      return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ERROR INTERCEPTOR
axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("🔥🔥 Problemas com o servidor!");
  }

  const { status, data, config, headers } = error.response;

  //  401
  if (status === 401 && headers["www-authenticate"].includes("The token expired")) {
    console.log(error.response);
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("Sessão terminada, por favor refaça login");
  }

  //  404
  if (status === 404) {
    history.push("/notfound");
  }

  //  400
  if (error.response.status === 400 && config.method === "get" && data.errors.hasOwnProperty("id")) {
    history.push("/notfound");
  }

  //  500
  if (status === 500) {
    toast.error("🔥🔥 Problemas com o servidor!");
  }

  throw error.response;
});

// TODO: DELAY - TIRAR EM PRODUÇÃO
let time = 0;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url: string) => axios.get(url).then(sleep(time)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(time)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(time)).then(responseBody),
  delete: (url: string) => axios.delete(url).then(sleep(time)).then(responseBody),
  postCommand: (url: string) => axios.post(url).then(sleep(time)).then(responseBody),
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

//  TODO: DELETAR
const Grupos = {
  list: (): Promise<IGrupo[]> => requests.get("/grupos"),
  details: (id: string) => requests.get(`/grupos/${id}`),
  create: (grupo: IGrupo) => requests.post("/grupos", grupo),
  update: (grupo: IGrupo) => requests.put(`/grupos/${grupo.id}`, grupo),
  delete: (id: string) => requests.delete(`/grupos/${id}`),
};

//  PUBLIC
const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user),
};

// --------- APPTRAINER
//  PUBLIC
const Profiles = {
  get: (username: string): Promise<IProfile> => requests.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setmain`, {}),
  deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
  updateAbout: (profile: Partial<IProfile>) => requests.put(`/profiles`, profile), // o PARTIAL deixa que objetos incompletos sejam atualizados
};

//  PRIVATE
const UserLore = {
  get: (): Promise<IUserLore> => requests.get("/lores"),
  create: (tome: ITome) => requests.post("/lores", tome),
  delete: (id: string) => requests.delete(`/lores/${id}`),
  setUp: (id: string) => requests.post(`/lores/${id}/setup`, {}),
  setDown: (id: string) => requests.post(`/lores/${id}/setdown`, {}),
  changeActive: (id: string) => requests.post(`/lores/${id}/changeactive`, {}),
};

//  PRIVATE
const UserCollection = {
  get: (): Promise<IUserCollection> => requests.get("/collections"),
  create: (etude: IEtude) => requests.post("/collections", etude),
  edit: (etude: IEtude) => requests.put(`/collections/${etude.id}`, etude),
  details: (id: string) => requests.get(`/collections/${id}`),
  fluenceLearning: (id: string) => requests.post(`/collections/${id}/fluencelearning`, {}),
  fluenceEvolution: (id: string) => requests.post(`/collections/${id}/fluenceevolution`, {}),
  fluenceFlowing: (id: string) => requests.post(`/collections/${id}/fluenceflowing`, {}),
  delete: (id: string) => requests.delete(`/collections/${id}`),
  changeActive: (id: string) => requests.post(`/collections/${id}/changeactive`, {}),
};

//  PRIVATE
const UserPractice = {
  get: (): Promise<IUserPractice> => requests.get("/practices"),
  done: (id: string) => requests.post(`/practices/${id}`, {}),
};

//  PRIVATE
const UserChapters = {
  today: (): Promise<IChapter> => requests.get("/chapters/today"),
  week: (): Promise<IUserChaptersWeek> => requests.get("/chapters/week"),
  month: (): Promise<IUserChaptersMonth> => requests.get("/chapters/month"),
  brief: (): Promise<IBrief> => requests.get("/chapters/brief"),

  // TODO: Need to become get, or be addded to requests.
  decrease: () => requests.postCommand("/chapters/decrease"),
  increase: () => requests.postCommand("/chapters/increase"),
};

export default {
  Grupos,
  User,
  Profiles,
  UserLore,
  UserCollection,
  UserPractice,
  UserChapters,
};
