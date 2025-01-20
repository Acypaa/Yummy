import React, { useEffect, useState } from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import '../styles/Profile.css'; 

const UserFriends = () => {
  const { username } = useParams(); // Получаем имя пользователя из параметров маршрута
  const [userFriends, setUserFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
    } else {
      // const currentUsername = JSON.parse(user).username;
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || {};
      
      // Получаем подписки для указанного пользователя
      const userSubscriptions = subscriptions[username] || [];
      console.log(`Подписки для ${username}:`, userSubscriptions); 
      setUserFriends(userSubscriptions);
    }
  }, [username, navigate]);

  const filteredFriends = userFriends.filter(friend =>
    friend && friend.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

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
          <button className='right__btn btn-friends'>Список подписок</button>
          <input 
            type="text" 
            className='Profile__input' 
            placeholder='Поиск подписки' 
            onChange={(e) => setSearchTerm(e.target.value)} // Обновляем состояние поискового запроса
          />
          <div className="friends-list">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend, index) => (
                <div key={index} className="friend-item">
                  <Link to={`/profile/${friend}`} className='friend-username'>{friend}</Link> {/* Никнейм как ссылка */}
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