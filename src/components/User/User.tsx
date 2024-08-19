import React, { useCallback, useEffect, useState } from 'react';
import createPost from '../../helpers/createPost';
import getuserByEmail from '../../helpers/getUaserByEmail';
import { getAllPosts } from '../../helpers/getAllPosts';
import { Post } from '../../constants';
import { useNavigate } from 'react-router-dom';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import css from './User.module.css';


const User: React.FC = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [userEmail, setUserEmail] = useState('')

  const navigate = useNavigate()
  const user = localStorage.getItem('myAppUsersData')

  const handleChTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value)
  }

  const handleChText = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title === '' || text === '') return

    getuserByEmail(userEmail!).then((user) => {
      const id = user?.id
      if (id) {
        createPost({
          title: title,
          content: text,
          userId: id
        }).then(() => {
          setTitle('')
          setText('')
          getPosts()
        }).catch((error) => {
          console.log(error.message);
        })
      }
    })
  }

  const getPosts = useCallback(() => {
    getAllPosts().then(postsData => {
      setPosts(postsData);
      console.log(postsData);
    })
  }, [])

  useEffect(() => {
    if (user) {
      setUserEmail(JSON.parse(user!).email)
      getPosts();
    } else {
      navigate('/login');
    }
  }, [getPosts, navigate, user, userEmail]);

  const postslist = (() => (
    <ul className={css.postslist}>
      {posts.map((post, i) => (
        <li className={css.post} key={i}>
          <span>{post.title}</span>
          <span>{post.content}</span>
        </li>
      ))}
    </ul>
  ))()

  return (
    <div className={css.userPage}>
      <header>
        {userEmail && <span>Hello, {userEmail}!</span>}
        <LogOutBtn />
      </header>

      {postslist}

      <form onSubmit={handleSubmit} className={css.postForm}>
        <input
          required
          type="text"
          id={css.titleInput}
          value={title}
          onChange={handleChTitle}
          placeholder="New post's title"
        />
        <textarea
          required
          id={css.texArea}
          value={text}
          onChange={handleChText}
          placeholder='Text of the post'
        >
        </textarea>
        <input id={css.submitBtn} type="submit" value="Create post" />
      </form>
    </div>
  );
};

export default User;