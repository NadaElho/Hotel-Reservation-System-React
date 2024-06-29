import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://hotel-reservation-system-node-1.onrender.com/api/v1",
});
try {
  const data = await axios.get(
    `http://localhost:3000/api/v1/users/userProfile`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        if (config.headers)
          config.headers.authorization = `Bearer ${accessToken}`;
      }
      return config;
    }
  );
} catch (err) {
  // if (err.message === "Network Error") {
  //   window.location.href = "/not-found";
  // } else if (err.response.data.message === "Unexpected token") {
  //   localStorage.removeItem("token");
  //   console.log("err", err.response.data.message);
  // } else {
  //   console.log("An unexpected error occurred:", err);
  // }
  console.log(err)
}

export default axiosInstance;