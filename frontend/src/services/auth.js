import api from '../lib/axios.js';

export const login = async (credentials) => {
  const response = await api.post('/api/login', credentials);
  localStorage.setItem('token', response.data.token); // save token
  return response.data.user;
};


export const register = async (credentials)=>{
  const response = await api.post('/api/register', credentials)
return response.data.user



};



export const getUser = async () => {
  try {
    const response = await api.get('/api/user');
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) return null;
    throw error;
  }
};

export const logout = async () => {
  await api.post('/api/logout');
  localStorage.removeItem('token'); // clear token
};

export const updateProfile = async (credentials) => {
    try {
        const response = await api.put('/api/user/update', credentials);
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) return null;
        throw error;
    }
}

export const changePassword = async (credentials) => {
    try {
        const response = await api.put('/api/user/password', credentials);
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) return null;
        throw error;
    }
}
 




