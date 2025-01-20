// import React, { useEffect, useState } from 'react'; 
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { Link, useNavigate, useParams } from 'react-router-dom'; 
// import '../styles/Profile.css';

// const UserProfile = () => {
//     const { username } = useParams(); // Получаем имя пользователя из URL
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null);
//     const [isSubscribed, setIsSubscribed] = React.useState(false);
//     useEffect(() => {
//         const user = localStorage.getItem('currentUser');
//         if (!user) {
//             navigate('/');
//         } else {
//             const users = JSON.parse(localStorage.getItem('users')) || [];
//             const foundUser = users.find(user => user.username === username);
//             if (foundUser) {
//                 setUserData(foundUser);
//             } else {
//                 navigate('/'); // Если пользователь не найден, перенаправляем на главную
//             }
//         }
//     }, [username, navigate]);

//     if (!userData) {
//         return <div>Загрузка...</div>; // Показать загрузку, пока данные не загружены
//     }

//     return (
//         <div>
//             <Header />
//             <div className="Profile">
//                 <div className="Profile__left">
//                     <h2 className='Profile__heading'>{userData.username}</h2>
//                     <Link to={`/friends/${username}`} className='link__friends'>
//                         <p className='Profile__line line-Friends'>Подписки</p>
//                     </Link>
//                     <Link to={`/favorites/${username}`} className='link__favorites'>
//                         <p className='Profile__line'>Избранное</p>
//                     </Link>
//                     <Link to={`/publicates/${username}`} className='link__publicates'>
//                         <p className='Profile__line'>Публикации</p>
//                     </Link>
//                 </div>
//                 <div className="profile__right">
//                     <h1 className='Profile__main-heading'>Профиль</h1>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default UserProfile;
import React, { useEffect, useState } from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import '../styles/Profile.css';

const UserProfile = () => {
    const { username } = useParams(); // Получаем имя пользователя из URL
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (!user) {
            navigate('/');
        } else {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(user => user.username === username);
            if (foundUser) {
                setUserData(foundUser);
                const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || {};
                setIsSubscribed(subscriptions[JSON.parse(user).username]?.includes(username));
            } else {
                navigate('/'); // Если пользователь не найден, перенаправляем на главную
            }
        }
    }, [username, navigate]);

    const handleSubscribe = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Пожалуйста, войдите в систему, чтобы подписаться на пользователей.');
            return;
        }

        if (currentUser.username == username) {
            alert('Нельзя подписаться на самого себя.');
            return;
        }

        const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || {};
        if (isSubscribed) {
            subscriptions[currentUser.username] = subscriptions[currentUser.username].filter(
                user => user !== username
            );
            alert(`Вы отписались от ${username}.`);
        } else {
            if (!subscriptions[currentUser.username]) {
                subscriptions[currentUser.username] = [];
            }
            subscriptions[currentUser.username].push(username);
            alert(`Вы подписались на ${username}.`);
        }

        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        setIsSubscribed(!isSubscribed);
    };

    if (!userData) {
        return <div>Загрузка...</div>; 
    }

    return (
        <div>
            <Header />
            <div className="Profile">
                <div className="Profile__left">
                    <h2 className='Profile__heading'>{userData.username}</h2>
                    
                    <Link to={`/friends/${username}`} className='link__friends'>
                        <p className='Profile__line line-Friends'>Подписки</p>
                    </Link>
                    <Link to={`/favorites/${username}`} className='link__favorites'>
                        <p className='Profile__line'>Избранное</p>
                    </Link>
                    <Link to={`/publicates/${username}`} className='link__publicates'>
                        <p className='Profile__line'>Публикации</p>
                    </Link>
                    <button className='subscribe-btn' onClick={handleSubscribe}>
                        {isSubscribed ? 'Отписаться' : 'Подписаться'}
                    </button>
                </div>
                <div className="profile__right">
                    <h1 className='Profile__main-heading'>Профиль</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;