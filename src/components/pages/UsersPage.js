import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import '../../UserList.css'

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

  
  const handleSubmit = async (event) => {
    event.preventDefault();

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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8075/api/v1/admin/allUsers", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer_' + data.token // include your header here
      }
    })
      .then(response => response.json())
      .then(users => setUsers(users))
      .catch(error => console.error(error));
  }, []);

  const [deletingUser, setDeletingUser] = useState();


  fetch("http://localhost:8075/api/v1/admin/delete/" + deletingUser, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer_' + data.token // include your header here
    }
  })

  const deleteUser = (id) => {
    setDeletingUser(id);
  };
  console.log(users)

  return (
    <>
      <div>
        <h1 align="center">Upload File </h1>
      </div>

      <div className="text-center">

        <div>
          <form onSubmit={handleSubmit}>
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
              Choose a pdf file:
              <input type="file" accept=".pdf" onChange={(event) => setFile(event.target.files[0])} />
            </p>
            <p>
              Choose a jpg picture:
              <input type="file" accept=".jpg" onChange={(event) => setPicture(event.target.files[0])} />
            </p>
            <p>
              <button type="submit">Upload</button>
            </p>
          </form>
        </div>
        <div>
        </div>
        <div>
          <h1 align="center">Users</h1>
        </div>
        <div>

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
          <div class="container mt-3 mb-4">
            <div class="col-lg-9 mt-4 mt-lg-0">
              <div class="row">
                <div class="col-md-12">
                  <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                    <table class="table manage-candidates-top mb-0">
                      <thead>
                        <tr>
                          <th class="text-center">Username</th>
                          <th class="text-center">Candidate Name</th>
                          <th class="text-center">Email</th>
                          <th class="text-center">Status</th>
                          <th class="action text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} class="candidates-list">
                            <td class="title">
                              <div class="thumb">
                                <h5>{user.username}</h5>
                              </div>
                            </td>
                            <td class="candidate-list-favourite-time text-center">
                              <span class="candidate-list-time order-1">{user.firstName} {user.lastName}</span>
                            </td>
                            <td class="candidate-list-favourite-time text-center">
                              <span class="candidate-list-time order-1">{user.email}</span>
                            </td>
                            <td class="candidate-list-favourite-time text-center">
                              <a class="candidate-list-favourite order-2 text-danger" href="#"><i class="fas fa-heart"></i></a>
                              <span class="candidate-list-time order-1">{user.status}</span>
                            </td>
                            <td>
                              <ul class="list-unstyled mb-0 d-flex justify-content-end">
                                <li><button onClick={() => deleteUser(user.id)}><a href="#" class="text-danger" data-toggle="tooltip" title="" data-original-title="Delete"><i class="far fa-trash-alt"></i></a></button></li>
                              </ul>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/home">
          <button className="primary-button">Back to Home</button>
        </Link>
      </div>
    </>
  )
}
