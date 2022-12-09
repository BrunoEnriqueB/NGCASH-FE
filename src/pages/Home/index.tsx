import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import ApiTypeError from '../../@types/ApiTypeError';
import Logout from '../../components/Logout';
import Profile from '../../components/Profile';
import Transfers from '../../components/Transfers';
import Transfer from '../../components/Transfer';
import { ApiContext } from '../../context/api';
import styles from './styles.module.css';

function Home() {
  const { getUserBalance } = useContext(ApiContext);
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    getUserBalance()
      .then((data) => {
        setBalance(data.data.balance);
        setUsername(data.data.username);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const { data } = error.response!;

          if (data instanceof Array<ApiTypeError>) {
            window.alert(data[0].error);
          }
          if (data.message) {
            window.alert(data.message);
          }
        }
      });
  });

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.divProfile}>
          <Profile balance={balance} username={username} />
        </div>
        <div className={styles.divLogout}>
          <Logout />
        </div>
      </header>
      <main className={styles.home}>
        <Transfer />
        <Transfers />
      </main>
    </div>
  );
}

export default Home;
