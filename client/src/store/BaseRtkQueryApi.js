import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let baseUrl = 'http://94.247.128.204:5000/api';

const createBaseApi = (url) => {
    baseUrl = baseUrl + url;
    return createApi({
      reducerPath: 'api',
      baseQuery: fetchBaseQuery({ 
        baseUrl,
        prepareHeaders: (headers) => {
          const token = localStorage.getItem('token');
          if (token) {
            headers.set('Authorization', token);
          }
          return headers;
        },
      }), 
    });
  };

export default createBaseApi;