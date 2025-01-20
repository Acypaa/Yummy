import React, { useEffect, useState } from 'react'; 
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/Profile.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { FAVORITES_ROUTE, PUBLICATES_ROUTE } from '../../utils/consts'; 

const Friends = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [subscriptions, setSubscriptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения поискового запроса

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (!user) {
            navigate('/');
        } else {
            const currentUsername = JSON.parse(user).username;
            setUsername(currentUsername);
            
            const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || {};
            setSubscriptions(subscriptions[currentUsername] || []);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        window.location.reload(); 
        navigate('/'); 
    };

    // Фильтруем подписки на основе поискового запроса
    const filteredSubscriptions = subscriptions.filter(sub =>
        sub.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Header />
            <div className="Profile">
                <div className="Profile__left">
                    <h2 className='Profile__heading'>{username}</h2>
                    <p className='Profile__line line-Friends'>Подписки</p>
                    <Link to={FAVORITES_ROUTE} className='link__friends'>
                        <p className='Profile__line'>Избранное</p>
                    </Link>
                    <Link to={PUBLICATES_ROUTE} className='link__friends'>
                        <p className='Profile__line'>Публикации</p>
                    </Link>
                    <button className='Profile__btn' onClick={handleLogout}>Выход</button>
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
                    <ul className='subscriptions-list'>
                        {filteredSubscriptions.length > 0 ? (
                            filteredSubscriptions.map((sub, index) => (
                                <li key={index} className='subscription-item'>
                                    <Link to={`/profile/${sub}`} className='subscription-link'>
                                        {sub}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li>Нет подписок</li>
                        )}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Friends;