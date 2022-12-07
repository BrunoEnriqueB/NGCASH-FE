import './Logout.css';
import { ApiContext } from '../../context/api';
import { useContext } from 'react';

function Logout() {
  const { signOut } = useContext(ApiContext);

  return (
    <button className='logout' onClick={signOut}>
      Logout
    </button>
  );
}

export default Logout;
