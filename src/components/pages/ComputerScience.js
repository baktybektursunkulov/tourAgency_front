import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

export default function Genres() {

    const [data, setData] = useState([]);
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
        fetch('http://localhost:8075/books/2', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer_' + jwt.token // include your header here
            }
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);


    return (
        <>
            <div>
                <h1 align="center">ComputerScience</h1>
            </div>

            <div className="text-center">
                <div>
                    {data.map(item => (
                        <div key={item.id} >
                            <div className="product">
                                <div className="product-image">
                                    <img src={item.url_picture} alt="Product Image" />
                                </div>
                                <div className="product-details">
                                    <h2 className="product-title">{item.name}</h2>
                                    <p className="product-description">{item.description}</p>
                                    <div className="product-price">{item.author}</div>
                                    <div className="product-price">{item.year}</div>
                                    <button className="product-button" ><a href={item.url_minio} target="_blank">Скачать</a></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/home">
                    <button className="primary-button">Back to Home</button>
                </Link>
            </div>
        </>
    )
}
