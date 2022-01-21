import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

type TodosData = {
  done: boolean;
  task: string;
  __v: number;
  _id: string;
};
type RequestHandlerPropsData = {
  data: {
    todos: TodosData[];
  };
  description: string;
  message: string;
};

type RequestHandlerProps = {
  data: RequestHandlerPropsData;
  status: number;
};

const FailedHandlerRequest = (res: RequestHandlerProps) => ({
  data: res.data,
  status: res.status,
  error: true,
});
const SuccessHandlerRequest = (res: RequestHandlerProps) => ({
  data: res.data,
  status: res.status,
  success: true,
});

const PublicHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "X-Requested-With",
  Accept: "application/json",
  "Content-Type": "application/json",
};

const api = () => {
  const request = axios.create({
    baseURL: API_URL,
    responseType: "json",
    headers: PublicHeader,
  });

  return request;
};

const request = {
  get: async (url: string) => {
    return await api()
      .get(url)
      .then(SuccessHandlerRequest)
      .catch(FailedHandlerRequest);
  },
  post: async (url: string, data: object) => {
    return await api()
      .post(url, data)
      .then(SuccessHandlerRequest)
      .catch(FailedHandlerRequest);
  },
  put: async (url: string, data: object) => {
    return await api()
      .put(url, data)
      .then(SuccessHandlerRequest)
      .catch(FailedHandlerRequest);
  },
  delete: async (url: string) => {
    return await api()
      .delete(url)
      .then(SuccessHandlerRequest)
      .catch(FailedHandlerRequest);
  },
};

export default request;
