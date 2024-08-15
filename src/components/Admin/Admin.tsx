import React, { useEffect, useState } from 'react';
import { User } from '../../constants';
import css from './Admin.module.css';
import getAllUsers from '../../helpers/GetAllUsers';
import logOut from '../../helpers/logOut';
import deleteUser from '../../helpers/deleteUser';


const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])

  const getUsers = () => {
    getAllUsers().then(data => {
      if (data) setUsers(data)
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className={css.wrap}>
      <header>
        <button onClick={logOut}>Log out</button>
      </header>

      <span>List of users:</span>
      {users.length > 0 ? (
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
                      onClick={() => deleteUser(user.id).then(() => getUsers())}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Admin;