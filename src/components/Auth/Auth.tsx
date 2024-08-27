import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL, User } from '../../constants';
import Loader from '../Loader/Loader';
import infoIcon from '../../assets/info_icon.svg';
import css from './Auth.module.css';


const Auth: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<User["role"]>('user')
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

  const changeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value as User["role"])
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email === '' || password === '') return

    setIsLoading(true)
    const userData: User = {
      email: email,
      password: password,
      role: role
    }

    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json"
      }
    })

    if (res.ok) {
      setIsLoading(false)
      setEmail('');
      setPassword('');
      setRole('user');
      navigate("/login");
    } else {
      setIsLoading(false)
      setIsError(true);
    }
  }

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.window}>
          <div className={css.norificationWindow}>
            <img src={infoIcon} alt="info" />
            <div>
              <p>Hi there! This is my Rect|Nest pet project.
                Here you can create a new account.
              </p>
              <p>Choose bitween two roles:</p>
              <p>- <b><u>User</u></b>: creates messages and views all other created messages.</p>
              <p>- <b><u>Admin</u></b>: sees and manages list of users and administrators.</p>
            </div>
          </div>
          {isError ? <span>Something went wrong :(</span> : null}
          <span>Sign up. Already have an account? <Link to={'/login'}><u>Sign in</u></Link></span>
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
            <div className={css.radioWrap}>
              <label className={css.radioElem}>
                <input
                  className={css.radio}
                  type="radio"
                  onChange={changeRole}
                  value={'user'}
                  checked={role === 'user'}
                />
                User
              </label>
              <label className={css.radioElem}>
                <input
                  className={css.radio}
                  type="radio"
                  onChange={changeRole}
                  value={'admin'}
                  checked={role === 'admin'}
                />
                Admin
              </label>
            </div>
            <input
              className={css.submitBtn}
              disabled={email === '' || password === ''}
              type="submit"
              value="Create an account"
            />
          </form>
        </div>
      </div>

      {isLoading ? <Loader passedText={'This can take a long time because of using a free plan to deploy the server'} /> : null}
    </>
  );
};

export default Auth;