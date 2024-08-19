import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../../constants';
import css from './Admin.module.css';
import getAllUsers from '../../helpers/GetAllUsers';
import deleteUser from '../../helpers/deleteUser';
import getRole from '../../helpers/getRole';
import Modal from '../Modal/Modal';
import LogOutBtn from '../LogOutBtn/LogOutBtn';


const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [role, setRole] = useState<'admin' | 'user'>('admin')
  const [editedUser, seteditedUser] = useState<User | null>(null)

  const getUsers = useCallback(() => {
    getAllUsers(role).then(data => {
      if (data) setUsers(data)
    })
  }, [role])

  const handleDelete = (id?: number) => {
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

  useEffect(() => {
    getRole().then((curRole) => {
      if (curRole) {
        setRole(curRole)
      }
    })
    getUsers()
  }, [getUsers])

  return (
    <div className={css.wrap}>
      <header>
        <LogOutBtn/>
      </header>

      {users.length > 0 ? (
        <>
          <span>List of users:</span>
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
                    <td>
                      <button
                        onClick={() => seteditedUser(user)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      ) : null}

      {editedUser ? <Modal user={editedUser} seteditedUser={seteditedUser} getUsers={getUsers}/> : null}
    </div>
  );
};

export default Admin;