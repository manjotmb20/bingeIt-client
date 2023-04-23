import axios from 'axios';

const USER_API = 'http://localhost:5004/api/users';

export const fetchUserById = async (id) => {
  console.log('fetchUserByUsername');
    console.log(id);
    console.log(USER_API);
  const response = await axios.get(`${USER_API}/${id}`);
  return response.data;
};
