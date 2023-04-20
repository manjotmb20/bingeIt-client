import axios from "axios";
import queryString from "query-string";



const baseURL = "http://localhost:5004/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});



async function authenticate(username, password) {
  try {
    console.log("here-publicclient");
    console.log(`${baseURL}/user/signin`)
    const response = await axios.post(`${baseURL}/user/signin`, {
      username,
      password,
    });

    const token = response.data.token;
    localStorage.setItem("actkn", token);
    console.log("Token stored:", token);
  } catch (error) {
    console.error("Authentzication failed:", error);
  }
}

console.log(authenticate("manjot1111", "manjot1234"));

publicClient.interceptors.request.use(async config => {

    console.log("here");
  return {
    ...config,
    headers: {
      "Content-Type": "application/json"
    }
  };
});

publicClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default publicClient;