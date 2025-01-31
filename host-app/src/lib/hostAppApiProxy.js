import axios from 'axios';

const CHAT_APP_BASE_URL = 'http://localhost:3002/api'; 

export const forwardToChatApi = async (endpoint, method = 'GET', data = null) => {
  try {
    const config = {
      method,
      url: `${CHAT_APP_BASE_URL}/${endpoint}`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error forwarding request to Chat App API:', error);
    throw error;
  }
};
