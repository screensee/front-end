import axios from 'axios';

export default (method = 'get') =>
  (url) =>
    (params = {}) =>
        new Promise((resolve, reject) => {
          axios[method](url, params, { withCredentials: true })
            .then((response) => {
              resolve(response.data.data);
            })
            .catch((error) => {
              reject(error);
            });
        });

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/b';
export const createUrl = {
  userInit: () => `${baseUrl}/users/init`,
  roomCreate: () => `${baseUrl}/rooms/create`,
  roomJoin: (roomId) => `${baseUrl}/rooms/join/${roomId}`,
  messGet: (roomId) => `${baseUrl}/mess/${roomId}`,
  messPost: () => `${baseUrl}/mess/post`,
};