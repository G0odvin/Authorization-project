import useAuth from './useAuth';
import axios from '../api/axios';

export const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});

    try {
      await axios('/logout', {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};
