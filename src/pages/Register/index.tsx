import React, { useContext, useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import styles from './styles.module.css';
import logo from '../../assets/ngcash.png';
import Email from '../../assets/email.png';
import Password from '../../assets/lock.png';
import ShowPassword from '../../assets/show.png';
import HiddenPassword from '../../assets/hidden.png';

import { Link, useNavigate } from 'react-router-dom';
import { ApiContext } from '../../context/api';
import axios from 'axios';
import ApiTypeError from '../../@types/ApiTypeError';

export function Register() {
  const [passwordType, usePasswordType] = useState('password');
  const [passwordIconType, usePasswordIconType] = useState(HiddenPassword);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signUp } = useContext(ApiContext);

  const navigate = useNavigate();

  function handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.currentTarget.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  async function submit() {
    try {
      const res = await signUp(username, password);
      navigate('/login');
      if (res.data.message) {
        window.alert(res.data.message);
      }
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

  function togglePasswordType() {
    usePasswordType(passwordType === 'password' ? 'text' : 'password');
    usePasswordIconType(
      passwordType === 'password' ? ShowPassword : HiddenPassword
    );
  }

  return (
    <main className={styles.register}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={logo}></img>
          <h1 className={styles.logoTitle}>NG CASH</h1>
          <span className={styles.logoSubtitle}>
            Registre-se e começe a usar
          </span>
        </div>
        <div className={styles.inputs}>
          <Input
            label='Endereço de email'
            iconLeft={Email}
            placeholder='johndoe@example.com'
            onChange={handleChangeUsername}
          />
          <Input
            label='Sua senha'
            iconLeft={Password}
            iconRight={passwordIconType}
            placeholder='••••••••'
            type={passwordType}
            iconRightOnClick={togglePasswordType}
            onChange={handleChangePassword}
          />
        </div>
        <Button label='Enviar' onClick={submit} />
        <Link to='/login'>
          <span className={styles.login}>Já tem uma conta? Entre aqui</span>
        </Link>
      </div>
    </main>
  );
}
