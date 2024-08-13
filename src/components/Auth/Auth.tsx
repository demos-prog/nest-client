import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, User } from '../../constants';
import css from './Auth.module.css'


const Auth: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<User["role"]>('user')
  const [isError, setIsError] = useState(false)
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
      setEmail('');
      setPassword('');
      setRole('user');
      navigate("/login");
    } else {
      setIsError(true);
    }
  }

  return (
    <div className={css.wrapper}>
      {isError ? <span>Something went wrong :(</span> : null}
      <span>Sighn up. Already have an account?</span>
      <form onSubmit={submit} className={css.form}>
        <input required type="email" placeholder='Email' value={email} onChange={changeEmail} />
        <input required type="password" placeholder='Password' value={password} onChange={changePassword} />
        <div className={css.radioWrap}>
          <label>
            <input type="radio" onChange={changeRole} value={'user'} checked={role === 'user'} />
            User
          </label>
          <label>
            <input type="radio" onChange={changeRole} value={'admin'} checked={role === 'admin'} />
            Admin
          </label>
        </div>
        <input type="submit" value="Create an account" />
      </form>
    </div>
  );
};

export default Auth;