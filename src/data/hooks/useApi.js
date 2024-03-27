import ApiService from "../services/api.service";

export default async function useApi ({ method, url, axiosInstance = ApiService, data = {}, config = {} }) {
  let data_res = null;
  let error = null;
  let statusCode = null;

  try {
    let res
    if (method.toLowerCase() == 'get' || method.toLowerCase() == 'delete')
      res = await axiosInstance[method.toLowerCase()](url, config);
    else
      res = await axiosInstance[method.toLowerCase()](url, data, config);
    data_res = res.data;
    statusCode = res.status
  } catch (err) {
    error = err.response?.data?.detail;
    statusCode = err.response?.status;
  }
  return [data_res, error, statusCode];

}