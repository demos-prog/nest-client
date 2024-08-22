import React from 'react';
import css from './Button.module.css';

type ButtonProps = {
  width: string | number,
  height: string | number,
  backgroundColor: string,
  text: string,
  action: () => void,
  disabled: boolean,
}

const Button: React.FC<ButtonProps> = ({ width, height, text, backgroundColor, disabled, action }) => {


  return (
    <button
      disabled={disabled}
      className={css.customBtn}
      onClick={action} 
      style={{ width, height, backgroundColor }}
    >
      {text}
    </button>
  );
};

export default Button;