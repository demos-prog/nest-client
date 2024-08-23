import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../constants';
import getAllUsers from '../../helpers/GetAllUsers';
import deleteUser from '../../helpers/deleteUser';
import getRole from '../../helpers/getRole';
import Modal from '../Modal/Modal';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import editIacon from '../../assets/editIcon.svg';
import deleteIcon from '../../assets/delete.svg';
import css from './Admin.module.css';
import logOut from '../../helpers/logOut';


const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [role, setRole] = useState<'admin' | 'user'>('admin')
  const [editedUser, seteditedUser] = useState<User | null>(null)

  const navigate = useNavigate()
  const user = localStorage.getItem('myAppUsersData')
  const userEmail = JSON.parse(user!).email

  const getUsers = useCallback(() => {
    getAllUsers(role)
      .then(data => {
        if (data) setUsers(data)
      }).catch(() => {
        logOut()
      })
  }, [role])

  const handleDelete = (id?: number) => {
    const confirmation = confirm('Are you sure you want to delete it?')
    if (confirmation) {
      deleteUser(role, id)
        .then(() => getUsers())
        .catch((error: unknown) => {
          if (error instanceof Error) {
            alert(error.message);
          } else {
            alert('An unknown error occurred');
          }
        });
    }
  }

  useEffect(()=>{
    getUsers()
  },[getUsers])

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
    }

    getRole().then((currentRole) => {
      if (currentRole) {
        setRole(currentRole)
      }
    })
  }, [navigate, user, userEmail, users])

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <header>
          {userEmail && <span className={css.hello}>Hello,&nbsp;{userEmail}!</span>}
          <LogOutBtn />
        </header>

        {users.length > 0 ? (
          <div className={css.tableWrap}>
            <span className={css.listName}>List of users:</span>
            <table>
              <thead>
                <tr>
                  {Object.keys(users[0]).map((key, i) => {
                    if (key === 'id' || key === 'password' || key === 'createdAt' || key === 'updatedAt') return null
                    return (
                      <th key={i}>{key}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td className={css.btnCell}>
                        <img
                          className={css.btn}
                          onClick={() => seteditedUser(user)}
                          src={editIacon}
                          alt="edit"
                        />
                      </td>
                      {user.email !== userEmail && (
                        <td className={css.btnCell}>
                          <img
                            className={css.btn}
                            onClick={() => handleDelete(user.id)}
                            src={deleteIcon}
                            alt="delete"
                          />
                        </td>
                      )}
                    </tr>
                  )
                }).reverse()}
              </tbody>
            </table>
          </div>
        ) : null}

        {editedUser ? <Modal user={editedUser} seteditedUser={seteditedUser} getUsers={getUsers} /> : null}
      </div>
    </div>
  );
};

export default Admin;