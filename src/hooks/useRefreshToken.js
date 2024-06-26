import useAuth from './useAuth';
import axios from '../api/axios';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });

    setAuth(prev => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        accessToken: response.data.accessToken,
        roles: response.data.roles,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};
