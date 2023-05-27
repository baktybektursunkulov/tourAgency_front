import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';


export default function AdminPage() {

    const formRef = useRef(null);
    const [file, setFile] = useState(null);
    const [picture, setPicture] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [year, setYear] = useState();
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const data = JSON.parse(localStorage.getItem('myData'));
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setErrorMessage('Please choose a file to upload.');
            return;
        }
        if (!picture) {
            setErrorMessage('Please choose a file to upload.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('picture', picture)
            formData.append('file', file);
            formData.append('author', author);
            formData.append('year', year);
            formData.append('title', title)
            formData.append('description', description)

            const response = await fetch('http://localhost:8075/file/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            } else {
                // Handle successful file upload
                console.log('File uploaded successfully.');
                formRef.current.reset();
                setYear();
                setAuthor('');
                setTitle('');
                setDescription('');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again later.');
        }

    };

    return (
        <>
            <div>
                <h1 align="center">Upload File</h1>
            </div>

            <div className="text-center">

                <div>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        {errorMessage && <div>{errorMessage}</div>}
                        <p>
                            <label>Title</label><br />
                            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                        </p>
                        <p>
                            <label>Author</label><br />
                            <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
                        </p>
                        <p>
                            <label>Year</label><br />
                            <input type="number" value={year} onChange={(event) => setYear(event.target.value)} />
                        </p>
                        <p>
                            <label>Description</label><br />
                            <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
                        </p>
                        <p>
                            Choose a file:
                            <input type="file" accept=".pdf" onChange={(event) => setFile(event.target.files[0])} />
                        </p>
                        <p>
                            Choose a picture:
                            <input type="file" accept=".jpg" onChange={(event) => setPicture(event.target.files[0])} />
                        </p>
                        <p>
                            <button type="submit">Upload</button>
                        </p>
                    </form>
                </div>
                <div>
                </div>
                <Link to="/users">
                    <button className="primary-button">Users List</button>
                </Link>
                <br />
                <Link to="/home">
                    <button className="primary-button">Back to Home</button>
                </Link>
            </div>
        </>
    )
}
