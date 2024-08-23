import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import getuserByEmail from '../../helpers/getUaserByEmail';
import Loader from '../Loader/Loader';
import login from '../../helpers/login';
import css from '../Auth/Auth.module.css'


const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const changeEmail = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setIsError(false)
    setEmail(e.target.value)
  }

  const changePassword = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setIsError(false)
    setPassword(e.target.value)
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email === '' || password === '') return

    setIsLoading(true)
    const userData = {
      email: email,
      password: password,
    }

    login(userData).then(res => {
      localStorage.setItem('myAppUsersData', JSON.stringify({ email: email, access_token: res.access_token }))
      setIsLoading(false)
      setEmail('');
      setPassword('');

      getuserByEmail(email).then((user) => {
        if (user) {
          const role = user.role;
          if (role === 'admin') {
            navigate("/admin");
          } else if (role === 'user') {
            navigate("/user");
          } else {
            navigate("/");
          }
        }
      })
    }).catch(error => {
      console.log(error.message);
      setIsError(true);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.window}>
          {isError ? <span>Something went wrong :(</span> : null}
          <span>Sign in. Don't have an account? <Link to={'/'}><u>Sign up</u></Link></span>
          <form onSubmit={submit} className={css.form}>
            <input
              className={css.input}
              required
              disabled={isLoading}
              type="email"
              placeholder='Email'
              value={email}
              onChange={changeEmail}
            />
            <input
              className={css.input}
              required
              disabled={isLoading}
              type="password"
              placeholder='Password'
              value={password}
              onChange={changePassword}
            />
            <input
              className={css.submitBtn}
              disabled={email === '' || password === ''}
              type="submit"
              value="Log in"
            />
          </form>
        </div>
      </div>

      {isLoading ? <Loader passedText={'This can take a long time because of using a free plan to deploy the server'} /> : null}
    </>
  );
};

export default Login;