import './Profile.css';
import user from '../../assets/user.png';

interface ProfileProps {
  username: string;
  balance: number;
}

function Profile(props: ProfileProps) {
  return (
    <div className='profile'>
      <img src={user} className='profile-image' />
      <div className='profile-data'>
        <span className='profile-name'>
          Hello again,{' '}
          <span className='profile-username'>{props.username}</span>
        </span>
        <span className='profile-balance'>
          Your balance:{' '}
          <span className='profile-balance-ammount'>
            R$ {props.balance.toFixed(2)}
          </span>
        </span>
      </div>
    </div>
  );
}

export default Profile;
