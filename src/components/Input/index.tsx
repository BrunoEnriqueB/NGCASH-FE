import './Input.css';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  iconLeft: string;
  iconRight?: string;
  iconRightOnClick?: () => void;
}

function Input(props: InputProps) {
  return (
    <div className='component'>
      <label htmlFor={props.label} className='component-label'>
        {props.label}
      </label>
      <div className='component-input'>
        <input
          name={props.label}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
        <img src={props.iconLeft} className='component-icon-left'></img>
        <img
          src={props.iconRight}
          onClick={props.iconRightOnClick}
          className='component-icon-right'
        />
      </div>
    </div>
  );
}

export default Input;
