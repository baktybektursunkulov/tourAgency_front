import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

export default function HomePage() {

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const jwt = JSON.parse(localStorage.getItem('myData'));
  const history = useHistory();

    useEffect(() => {
        const sessionData = localStorage.getItem('sessionData');
        if (sessionData) {
          const parsedSessionData = JSON.parse(sessionData);
          if (parsedSessionData.expiration < new Date().getTime()) {
            localStorage.removeItem('sessionData');
            history.push('/');
          }
        }
      }, [history]);

  useEffect(() => {
    fetch('http://localhost:8075/direction', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer_' + jwt.token // include your header here
      }
    })
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = event => {
    setSelectedOption(event.target.value);
  };
  console.log(selectedOption);


  return (

    <>
      <header className="gdl-header">
        <div id="logo" onClick="slowScroll('#top')">
          <h1 className="gdl-header__logo">
            <Link to="/home">
              <img src="https://digitallibrary.io/wp-content/themes/gdl-theme-twentytwentytwo/assets/logo-grey.svg" alt="Logotype for Global Digital Library" aria-hidden="true" width="217" height="62" />
            </Link>
          </h1>
        </div>

        <div className="gdl-header__usernav">
          <h5>
            <div>
              <select id="select" value={selectedOption} onChange={handleChange}>
                <option value="">Select an option</option>
                {options.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </h5>
          <span className="gdl-header__icon-link">
            <Link to={selectedOption}>
              <button ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#596d79" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></button>
            </Link>
          </span>
          <a href="/login?redirectToPage=%2Fedit-profile" class="gdl-header__icon-link" aria-label="Login">
            <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 8.28947C8.5 12.8597 12.3137 16.5789 17 16.5789C21.6863 16.5789 25.5 12.8597 25.5 8.28947C25.5 3.71921 21.6863 0 17 0C12.3137 0 8.5 3.71921 8.5 8.28947ZM32.1111 35H34V33.1579C34 26.0492 28.067 20.2632 20.7778 20.2632H13.2222C5.93111 20.2632 0 26.0492 0 33.1579V35H32.1111Z" fill="#596D79"></path>
            </svg>
          </a>

        </div>
      </header>

      <div id="top">
        <h1>Книга – это мечта, которую вы держите в руках,</h1>
        <h3>а цифровизация - это как способ жизни!</h3>
      </div>

      <div id="main">
        <div class="intro">
          <h2>Наши услуги помогут вам!</h2>
          <span>Большой выбор всего, что может вам пригодиться</span>
        </div>
        <div class="text">
          <span>Наша электронная библиотека может предоставить вам доступ к огромному количеству электронных книг на различные темы и на разных языках. Конкретный список книг, доступных в нашей библиотеке, может зависеть от поставщиков контента и подписки, которую вы выбираете.

            Мы можем предоставлять электронные книги в различных форматах, включая PDF, EPUB, MOBI, FB2 и др. Книги могут быть как бесплатными, так и платными, в зависимости от их авторства и издательства.

            Если вы ищете конкретную книгу, вы можете воспользоваться поиском в нашей библиотеке, чтобы найти нужный заголовок или автора. Мы также можем рекомендовать вам книги на основе ваших предпочтений чтения.</span>
        </div>
      </div>

      <div id="overview">
        <h2>Преимущества</h2>
        <h4>с нами все проще</h4>

        <div class="img">
          <a href="https://readrate.com/rus/books/1984"><img src="https://readrate.com/img/pictures/book/295/29554/29554/w240h400-d7dc49bc.jpg" alt="" /></a>
          <span>1984</span><br />
          <span>Автор: Джордж Оруэлл</span><br />
          <span>Из серии: Джордж Оруэлл: все книги</span>
        </div>
        <div class="img">
          <a href="https://readrate.com/rus/books/451-po-farengeytu"><img src="https://readrate.com/img/pictures/book/292/29286/29286/w240h400-cc0528ab.jpg" alt="" /></a>
          <span>451° по Фаренгейту</span><br />
          <span>Автор: Рэй Брэдбери</span>
        </div>
      </div>

      <div id="contacts">
        <center><h5>Обратная связь</h5></center>
        <form id="form_input">
          <label for="name">Имя <span>*</span></label><br />
          <input type="text" placeholder="Введите имя" name="name" id="name" /><br />
          <label for="email">Ваша почта <span>*</span></label><br />
          <input type="email" placeholder="Введите email" name="email" id="email" /><br />
          <label for="message">Сообщение <span>*</span></label><br />
          <textarea placeholder="Введите ваше сообщение" name="message" id="message"></textarea><br />
          <div id="mess_send" class="btn">Отправить</div>
        </form>
      </div>

    </>
  )
}


