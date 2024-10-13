import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const getFolder = async (inputs) => {
  console.log("🚀 ~ getFolder ~ inputs:", inputs);
  const jwt = localStorage.getItem("token");
  console.log("🚀 ~ getFolder ~ jwt:", jwt);
  const response = await axios.get(`${API_URL}/folder/${inputs.folderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  console.log("🚀 ~ getFolder ~ response:", response);
  return response;
};

export const createFolder = async (inputs) => {};

export const deleteFolder = async (inputs) => {};
