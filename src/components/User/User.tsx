import React, { useCallback, useEffect, useState } from 'react';
import createPost from '../../helpers/createPost';
import getuserByEmail from '../../helpers/getUaserByEmail';
import { getAllPosts } from '../../helpers/getAllPosts';
import { IPost } from '../../constants';
import { useNavigate } from 'react-router-dom';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import deletePost from '../../helpers/deletePost';
import Loader from '../Loader/Loader';
import PostModal from '../PostModal/PostModal';
import getAllUsers from '../../helpers/GetAllUsers';
import editIacon from '../../assets/editIcon.svg';
import deleteIcon from '../../assets/delete.svg';
import css from './User.module.css';


const User: React.FC = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [posts, setPosts] = useState<IPost[]>([])
  const [userEmail, setUserEmail] = useState('')
  const [userID, setUserID] = useState<number | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [userList, setUserList] = useState<Map<number, string>>()
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
          user: id,
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
    const confirmation = confirm('Are you sure you want to delete?')
    if (confirmation) {
      setIsLoading(true)
      deletePost(id).then((res) => {
        if (res) getPosts()
      }).catch(err => {
        console.log(err);
      }).finally(() => setIsLoading(false))
    }
  }

  const getPosts = useCallback(() => {
    getAllPosts().then(postsData => {
      setPosts(postsData);
    })
  }, [])

  useEffect(() => {
    if (user) {
      const currEmail = JSON.parse(user!).email
      getuserByEmail(currEmail).then((cuser) => {
        setUserID(cuser?.id)
      })
      setUserEmail(currEmail)
      getPosts();
    } else {
      navigate('/login');
    }

    if (postData) {
      document.body.classList.add(css.noScroll);
    } else {
      document.body.classList.remove(css.noScroll);
    }

    getAllUsers('admin').then(listOfUsers => {
      const Users = new Map
      listOfUsers.forEach((user: { id: number, email: string }) => {
        if (!Users.has(user.id)) Users.set(user.id, user.email)
      })
      setUserList(Users)
    })

    return () => {
      document.body.classList.remove(css.noScroll);
    };
  }, [getPosts, navigate, postData, user, userEmail]);

  const postslist = (() => (
    <ul className={css.postslist}>
      {posts.map((post, i) => (
        <li className={css.post} key={i}>
          <div className={css.postHeader}>
            <span>
              <b><u>{post.title}</u></b>&nbsp;&nbsp;
              (by: <span className={css.name}>{userList?.get(post.userId)}</span>)
            </span>
            <div className={css.actions}>
              <button
                disabled={post.userId !== userID}
                className={css.btn}
                onClick={() => setPostData({
                  title: post.title,
                  content: post.content,
                  id: post.id
                })}
              >
                <img src={editIacon} alt="edit" />
              </button>
              <button
                disabled={post.userId !== userID}
                className={css.btn}
                onClick={() => handleDelete(post.id)}
              >
                <img src={deleteIcon} alt="delete" />
              </button>
            </div>
          </div>
          <span>{post.content}</span>
        </li>
      )).reverse()}
    </ul>
  ))()

  return (
    <div className={css.pageWrap}>
      <div className={css.userPage}>
        <header>
          {userEmail && <span className={css.hello}>Hello,&nbsp;{userEmail}!</span>}
          <LogOutBtn />
        </header>

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
          <input
            disabled={title === '' || text === ''}
            id={css.submitBtn}
            type="submit"
            value="Create post"
          />
        </form>

        {postslist}

        {postData && (
          <PostModal
            postData={postData}
            setPostData={setPostData}
            userID={userID}
            getPosts={getPosts}
          />
        )}
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default User;