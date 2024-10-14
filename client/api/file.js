import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const deleteFile = async (inputs) => {
  const jwt = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/file/${inputs.folderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};

export const uploadFile = async (inputs) => {
  const jwt = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/file/upload`, inputs, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};
