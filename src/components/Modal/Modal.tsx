import React, { useState } from 'react';
import { User } from '../../constants';
import Loader from '../Loader/Loader';
import css from './Modal.module.css';
import editUser from '../../helpers/editUser';

type modalProps = {
  user?: User,
  seteditedUser: React.Dispatch<React.SetStateAction<User | null>>,
  getUsers: () => void,
}

const Modal: React.FC<modalProps> = ({ user, seteditedUser, getUsers }) => {
  const [email, setEmail] = useState(user?.email)
  const [role, setRole] = useState<User["role"]>(user?.role || 'user')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false)
    setEmail(e.target.value)
  }

  const changeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value as User["role"])
  }
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof Element && e.target.classList.contains(css.modalBackGround)) {
      seteditedUser(null);
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email === '') return

    setIsLoading(true)
    const userData: { email: string, role: 'admin' | 'user' } = {
      email: email ?? '',
      role: role
    }

    editUser(userData, user?.id)
      .then(() => {
        getUsers()
        setIsLoading(false)
        setEmail('');
        setRole('user');
        seteditedUser(null)
      }).catch((error: unknown) => {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('An unknown error occurred');
        }
      });
  }

  return (
    <div onClick={closeModal} className={css.modalBackGround}>
      <div className={css.modalWindow}>
        {isError ? <span>Something went wrong :(</span> : null}
        <form onSubmit={submit} className={css.form}>
          <input
            required
            disabled={isLoading}
            type="email"
            placeholder='Email'
            value={email}
            onChange={changeEmail}
          />
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
          <input type="submit" value="Change" />
        </form>
      </div>
      {isLoading ? <Loader passedText={'This can take a long time because of using a free plan to deploy the server'} /> : null}
    </div>
  );
};

export default Modal;

