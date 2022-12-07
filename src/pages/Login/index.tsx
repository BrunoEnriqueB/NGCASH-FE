import { useContext, useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import styles from './styles.module.css';
import logo from '../../assets/ngcash.png';
import Email from '../../assets/email.png';
import Password from '../../assets/lock.png';
import ShowPassword from '../../assets/show.png';
import HiddenPassword from '../../assets/hidden.png';

import { Link } from 'react-router-dom';
import { ApiContext } from '../../context/api';

import ApiTypeError from '../../@types/ApiTypeError';
import axios from 'axios';

export function Login() {
  const [passwordType, usePasswordType] = useState('password');
  const [passwordIconType, usePasswordIconType] = useState(HiddenPassword);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(ApiContext);

  function togglePasswordType() {
    usePasswordType(passwordType === 'password' ? 'text' : 'password');
    usePasswordIconType(
      passwordType === 'password' ? ShowPassword : HiddenPassword
    );
  }

  function handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.currentTarget.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  async function submit() {
    try {
      await signIn(username, password);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response!;

        if (data instanceof Array<ApiTypeError>) {
          window.alert(data[0].error);
        }
        if (data.message) {
          window.alert(data.message);
        }
      }
    }
  }

  return (
    <main className={styles.login}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={logo}></img>
          <h1 className={styles.logoTitle}>NG CASH</h1>
          <span className={styles.logoSubtitle}>Sign in and start to use</span>
        </div>
        <div className={styles.inputs}>
          <Input
            label='Username'
            iconLeft={Email}
            placeholder='johndoe@example.com'
            onChange={handleChangeUsername}
          />
          <Input
            label='Password'
            iconLeft={Password}
            iconRight={passwordIconType}
            placeholder='••••••••'
            type={passwordType}
            iconRightOnClick={togglePasswordType}
            onChange={handleChangePassword}
          />
        </div>
        <Button label='Enviar' onClick={() => submit()} />
        <Link to='/register'>
          <span className={styles.register}>
            Does not have an account? Create here
          </span>
        </Link>
      </div>
    </main>
  );
}
