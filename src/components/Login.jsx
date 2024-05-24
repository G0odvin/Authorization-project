// import React from 'react';
import { useEffect, useRef, useState } from 'react';

import axios from '../api/axios';
import { LOGIN_URL } from '../utils/variables';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state.from.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(user, pwd);
    try {
      const responce = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      console.log(JSON.stringify(responce?.data));
      const accessToken = responce?.data?.accessToken;
      const roles = responce?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.responce) {
        setErrMsg('No Server Response');
      } else if (error.responce?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (error?.responce.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }

      errRef.current.focus();
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={e => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Pasword:</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={e => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign in</button>
      </form>
      <p>
        Need an Account?
        <span>
          {/* put router link here */}
          <a href="#">Sign Up</a>
        </span>
      </p>
    </section>
  );
};
