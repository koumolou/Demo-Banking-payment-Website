
import api from '../lib/axios.js';

 export const balance = async () => {

  try {
     const response = await api.get('api/wallet/balance')
     return response.data
  } catch (error) {
               if (error.response?.status === 429) {
    throw new Error('Too many attempts. Please wait a moment.');
  }

    
}
 }

export const transactions = async () => {

    try {

        const response = await api.get('/api/transactions')
     return response.data.transactions
    } catch(error){

             if (error.response?.status === 429) {
    throw new Error('Too many attempts. Please wait a moment.');

    }
}
}

export const topup = async (amount) => {
    try {
        const response = await api.post('/api/wallet/top-up', { amount});
        return response.data;
    } catch (error) {
              if (error.response?.status === 429) {
    throw new Error('Too many attempts. Please wait a moment.');
    }
}
}

export const transfer = async (credentials) => {

    try {
        const response = await api.post('/api/wallet/transfer', credentials)
        return response.data;
    } catch (error) {
               if (error.response?.status === 429) {
    throw new Error('Too many attempts. Please wait a moment.');
    }
    
}
}