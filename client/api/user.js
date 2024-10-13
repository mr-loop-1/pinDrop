import axios from "axios";
// const API_URL = process.env.API_URL;

const data = [
  {
    ulid: "QWERTY",
    username: "abdsam",
    email: "abd1@gmail.com",
  },
];

export const getUser = async () => {
  const jwt = localStorage.getItem("token");
  //   const result = await axios.get(`${API_URL}/user/current-user`, {
  //     headers: {
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   });

  //   if (result.status != 200) {
  //     return;
  //   }

  const result = data[0];

  const data = {
    id: result.ulid,
    username: result.username,
    email: result.email,
  };
  return data;
};
