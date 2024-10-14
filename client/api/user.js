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

  if (response.status != 200) {
    return;
  }

  const data = {
    ulid: response.data.user.ulid,
    // username: response.data.user.username,
    email: response.data.user.email,
  };
  return data;
};
