import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const getUser = async () => {
  const jwt = localStorage.getItem("token");
  console.log("🚀 ~ getUser ~ jwt:", jwt);
  const response = await axios.get(`${API_URL}/user/current-user`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  console.log("🚀 ~ getUser ~ response:", response);

  if (response.status != 200) {
    return;
  }

  const data = {
    id: response.data.ulid,
    username: response.data.username,
    email: response.data.email,
  };
  return data;
};
