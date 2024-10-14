import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const getFolder = async (inputs) => {
  const jwt = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/folder/${inputs.folderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};

export const createFolder = async (inputs) => {
  console.log("🚀 ~ createFolder ~ inputs:", inputs);
  const jwt = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/folder/${inputs.folderId}`,
    inputs,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};

export const deleteFolder = async (inputs) => {
  const jwt = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/folder/${inputs.folderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};
