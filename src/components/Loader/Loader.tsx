import React from 'react';
import css from './Loader.module.css'

type LoaderProps = {
  passedText?: string
}

const Loader: React.FC<LoaderProps> = ({ passedText }) => {
  return (
    <div className={css.loaderWrap}>
      <div className={css.loader}></div>
      {passedText ? <span className={css.loadertext}>{passedText}</span> : null}
    </div>
  );
};

export default Loader;