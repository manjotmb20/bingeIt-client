import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:5004/";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});


async function authenticate(username, password) {
  try {
    const response = await axios.post(`${baseURL}/user/signin`, {
      username,
      password,
    });

    const token = response.data.token;
    localStorage.setItem("actkn", token);
    console.log("Token stored:", token);
  } catch (error) {
    console.error("Authentication failed:", error);
  }
}

console.log(authenticate("manjot1111", "manjot1234"));


console.log("privateClient", privateClient);
console.log("Token:", localStorage.getItem("actkn"));


privateClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("actkn")}`

    }
  };
});

privateClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default privateClient;