import axios from "axios";

const awsApi = (bearerTokenEnconded?: string) => {
  return axios.create({
    baseURL: `https://sandbox-api.bilidox.com/v1/`,
    headers: {
      Authorization: "Bearer " + bearerTokenEnconded,
    },
  });
};

export default awsApi;
