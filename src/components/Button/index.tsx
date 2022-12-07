import './Input.css';
import { ButtonHTMLAttributes } from 'react';

interface InputProps extends ButtonHTMLAttributes<HTMLInputElement> {
  label: string;
  onClick?: () => void;
}

function Input(props: InputProps) {
  return (
    <div className='component'>
      <button className='button' onClick={props.onClick}>
        {props.label}
      </button>
    </div>
  );
}

export default Input;
