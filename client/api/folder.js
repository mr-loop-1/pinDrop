import axios from "axios";
// const API_URL = process.env.API_URL;

export const getFolder = async (inputs) => {
  //   const result = await axios.post(`${API_URL}/auth/login`, inputs);
  const result = {
    status: 201,
  };

  return result;
};

export const pingServer = async () => {
  //   const result = await axios.get(`${API_URL}`);

  //   if (result.status != 200) {
  //     return;
  //   }

  const result = { status: 200 };

  return result.status;
};
