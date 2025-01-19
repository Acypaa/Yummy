import React, { useEffect, useState } from 'react'; 
import Header from '../components/Header';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import Footer from '../components/Footer';
import '../styles/Profile.css';
import { FRIENDS_ROUTE, FAVORITES_ROUTE, PUBLICATES_ROUTE } from '../utils/consts'; 

const UserProfile = () => {
    const { username } = useParams(); // Получаем имя пользователя из URL
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (!user) {
            navigate('/');
        } else {
            // Здесь вы можете добавить логику для получения информации о пользователе
            // Например, если у вас есть массив пользователей в localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(user => user.username === username);
            if (foundUser) {
                setUserData(foundUser);
            } else {
                navigate('/'); // Если пользователь не найден, перенаправляем на главную
            }
        }
    }, [username, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        window.location.reload(); 
        navigate('/');
    };

    if (!userData) {
        return <div>Загрузка...</div>; // Показать загрузку, пока данные не загружены
    }

    return (
        <div>
            <Header />
            <div className="Profile">
                <div className="Profile__left">
                    <h2 className='Profile__heading'>{userData.username}</h2>
                    <Link to={FRIENDS_ROUTE} className='link__friends'>
                        <p className='Profile__line line-Friends'>Подписки</p>
                    </Link>
                    <Link to={FAVORITES_ROUTE} className='link__favorites'>
                        <p className='Profile__line'>Избранное</p>
                    </Link>
                    <Link to={PUBLICATES_ROUTE} className='link__publicates'>
                        <p className='Profile__line'>Публикации</p>
                    </Link>
                    <button className='Profile__btn' onClick={handleLogout}>Выход</button>
                </div>
                <div className="profile__right">
                    <h1 className='Profile__main-heading'>Профиль</h1>
                    <button className='right__btn'>Публикации</button>
                    <button className='right__btn'>Избранное</button>
                    <input type="text" className='Profile__input' placeholder='Поиск рецепта' />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;