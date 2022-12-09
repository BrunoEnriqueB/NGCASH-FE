import './Transfer.css';
import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../context/api';
import axios from 'axios';
import ApiTypeError from '../../@types/ApiTypeError';

function Transfer() {
  const [sentToUsername, setSentToUsername] = useState('');
  const [value, setValue] = useState(0);
  const { transfer } = useContext(ApiContext);

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await transfer(sentToUsername, value);
      location.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { data } = err.response!;

        if (data instanceof Array<ApiTypeError>) {
          window.alert(data[0].error);
        }
        if (data.message) {
          window.alert(data.message);
        }
      }
    }
  }

  function handleSentToUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setSentToUsername(e.target.value);
  }

  function handleValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
  }

  return (
    <div className='transfer'>
      <h1>Transfer</h1>
      <form className='transfer-form' onSubmit={submitForm}>
        <div className='transfer-form-input'>
          <label htmlFor='sent-user'>Sent to: </label>
          <input
            type='text'
            placeholder='neox'
            name='sent-user'
            onChange={handleSentToUsername}
            required
            value={sentToUsername}
          />
        </div>
        <div className='transfer-form-input'>
          <label htmlFor='value'>Value: </label>
          <input
            type='number'
            placeholder='0'
            name='value'
            onChange={handleValue}
            value={value}
            required
          />
        </div>
        <div className='transfer-form-input'>
          <input type='submit' value='Submit' />
        </div>
      </form>
    </div>
  );
}

export default Transfer;
