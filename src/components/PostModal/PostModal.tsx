import React, { useState } from 'react';
import updatePost from '../../helpers/updatePost';
import Loader from '../Loader/Loader';
import css from './PostModal.module.css'

type PostModalProps = {
  postData: {
    title: string,
    content: string,
    id: number
  },
  setPostData: React.Dispatch<React.SetStateAction<{
    title: string;
    content: string;
    id: number;
  } | null>>,
  getPosts: () => void,
  userID: number | undefined,
}

const PostModal: React.FC<PostModalProps> = ({ postData, setPostData, getPosts, userID }) => {
  const [title, setTitle] = useState(postData.title)
  const [text, setText] = useState(postData.content)
  const [isLoading, setIsLoading] = useState(false)


  const handleChTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value)
  }

  const handleChText = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(e.target.value)
  }

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof Element && e.target.classList.contains(css.modalBackGround)) {
      setPostData(null)
    }
  }

  const handleEdit = () => {
    setIsLoading(true)
    updatePost(postData.id, {
      title: title,
      content: text,
      userId: userID ?? 0,
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setPostData(null)
      setIsLoading(false)
      getPosts()
    })
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleEdit()
  }

  return (
    <div onClick={closeModal} className={css.modalBackGround}>
      <div className={css.modalWindow}>
        <form onSubmit={submit} className={css.form}>
          <input
            required
            type="text"
            id={css.titleInput}
            value={title}
            onChange={handleChTitle}
            placeholder="Post's title"
          />
          <textarea
            required
            id={css.texArea}
            value={text}
            onChange={handleChText}
            placeholder='Text of the post'
          >
          </textarea>
          <input id={css.submitBtn} type="submit" value="Update post" />
        </form>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default PostModal;
