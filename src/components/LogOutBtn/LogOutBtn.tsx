import React from 'react';
import logOut from '../../helpers/logOut';
import css from './LogOutBtn.module.css'


const LogOutBtn: React.FC = () => {
  return <button className={css.btn} onClick={logOut}>Log out</button>;
};

export default LogOutBtn;