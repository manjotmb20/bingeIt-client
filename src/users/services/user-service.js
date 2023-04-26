import axios from 'axios';
//const API_BASE = process.env.REACT_APP_API_BASE;
//const USERS_API = `${API_BASE}/tuits`;
//const USERS_API = 'http://localhost:4000/api/users';
//const USERS_API = 'https://tuiter-node-server-app-6npb.onrender.com/api/users';
//const USERS_API = 'http://localhost:5004/api/users';
const USERS_API = 'https://webdev-project-node.onrender.com/api/users'
export const findAllUsers = async () => {
    const response = await axios.get(USERS_API);
    const users = response.data;

    return users;
}
export const findUserById = async (userId) => {
    console.log("Reached findUserById!")
    const response = await axios.get(`${USERS_API}/${userId}`);
    console.log("Response from findUserById :", response.data)
    const user= response.data;
    return user;
}
export const createUser = async (user) => {
    const response = await axios.post(USERS_API, user)
    console.log("createUser in services")
    return response.data;
}

export const login = async ({username, password}) => {
    let body = { username, password };
    const getStringLogin=`${USERS_API}/login/${username}/${password}`
        //USERS_API+"/login/"+username+"/"+password;
    //let response = await axios.get(`${USERS_API}/login/${username}/${password}`);
    let response = await axios.get(getStringLogin)
    console.log(response.data)
    return response.data;
};








export const deleteUser = async (uid) => {
    const response = await axios.delete(`${USERS_API}/delete/${uid}`)
    console.log(response)
    console.log(response.data)
    return response.data
}

export const updateUser = async (user) => {
    const response = await axios
        .put(`${USERS_API}/${user._id}`, user);
    return user;
}

