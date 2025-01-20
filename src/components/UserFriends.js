import React, { useEffect, useState } from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import '../styles/Profile.css'; 

const UserFriends = () => {
  const { username } = useParams(); // Получаем имя пользователя из параметров маршрута
  const [userFriends, setUserFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
    } else {
      const friends = JSON.parse(localStorage.getItem('friends')) || [];
      const userFriends = friends.filter(friend => friend.username === username);
      setUserFriends(userFriends);
    }
  }, [username, navigate]);

  return (
    <div>
      <Header />
      <div className="Profile">
        <div className="Profile__left">
          <h2 className='Profile__heading'>{username}</h2>
          <Link to={`/friends/${username}`} className='link__friends'>
            <p className='Profile__line'>Подписки</p>
          </Link>
          <Link to={`/favorites/${username}`} className='link__friends'>
            <p className='Profile__line'>Избранное</p>
          </Link>
          <Link to={`/publicates/${username}`} className='link__friends'>
            <p className='Profile__line'>Публикации</p>
          </Link>
          <Link to={`/profile/${username}`} className='link__friends'>
            <button className='Profile__btn'>Перейти к профилю</button>
          </Link>
        </div>
        <div className="profile__right">
          <h1 className='Profile__main-heading'>Подписки</h1>
          <div className="friends-list">
            {userFriends.length > 0 ? (
              userFriends.map(friend => (
                <div key={friend.id} className="friend-item">
                  <h3>{friend.username}</h3>
                  <Link to={`/profile/${friend.username}`}>Перейти к профилю</Link>
                </div>
              ))
            ) : (
              <p>У этого пользователя нет подписок.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserFriends;