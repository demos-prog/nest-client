import React, { useCallback, useEffect, useState } from 'react';
import createPost from '../../helpers/createPost';
import getuserByEmail from '../../helpers/getUaserByEmail';
import { getAllPosts } from '../../helpers/getAllPosts';
import { Post } from '../../constants';
import { useNavigate } from 'react-router-dom';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import deletePost from '../../helpers/deletePost';
import Loader from '../Loader/Loader';
import css from './User.module.css';
import PostModal from '../PostModal/PostModal';


const User: React.FC = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [userEmail, setUserEmail] = useState('')
  const [userID, setUserID] = useState<number | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [postData, setPostData] = useState<{
    title: string,
    content: string,
    id: number
  } | null>(null)


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
    setIsLoading(true)

    getuserByEmail(userEmail!).then((user) => {
      const id = user?.id
      if (id) {
        createPost({
          title: title,
          content: text,
          userId: id,
        }).then(() => {
          setTitle('')
          setText('')
          getPosts()
        }).catch((error) => {
          console.log(error.message);
        }).finally(() => setIsLoading(false))
      }
    })
  }

  const handleDelete = (id: number) => {
    setIsLoading(true)
    deletePost(id).then((res) => {
      if (res) getPosts()
    }).catch(err => {
      console.log(err);
    }).finally(() => setIsLoading(false))
  }

  const getPosts = useCallback(() => {
    getAllPosts().then(postsData => {
      setPosts(postsData);
    })
  }, [])

  useEffect(() => {
    if (user) {
      const currEmail = JSON.parse(user!).email
      getuserByEmail(currEmail).then((user) => {
        setUserID(user?.id)
      })
      setUserEmail(currEmail)
      getPosts();
    } else {
      navigate('/login');
    }
  }, [getPosts, navigate, user, userEmail]);

  const postslist = (() => (
    <ul className={css.postslist}>
      {posts.map((post, i) => (
        <li className={css.post} key={i}>
          <div className={css.postHeader}>
            <span><b>{post.title}</b></span>
            <div className={css.actions}>
              <button onClick={() => setPostData({
                title: post.title,
                content: post.content,
                id: post.id
              })}>
                Edit
              </button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          </div>
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

      {postData && <PostModal postData={postData} setPostData={setPostData} userID={userID} getPosts={getPosts}/>}
      {isLoading && <Loader />}
    </div>
  );
};

export default User;