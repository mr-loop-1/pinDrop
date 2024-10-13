import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const loginUser = async (inputs) => {
  const response = await axios.post(`${API_URL}/auth/login`, inputs);

  return response;
};

export const registerUser = async (inputs) => {
  const response = await axios.post(`${API_URL}/auth/register`, inputs);

  return response;
};

export const pingServer = async () => {
  //   const response = await axios.get(`${API_URL}`);

  //   if (response.status != 200) {
  //     return;
  //   }
  const response = { status: 200 };

  return response.status;
};
