import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';

export const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const responce = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        isMounted && setUsers(responce.data);
      } catch (error) {
        console.error(error);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users display</p>
      )}
    </article>
  );
};
