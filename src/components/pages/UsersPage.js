import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import '../../UserList.css'

export default function AdminPage() {

  const formRef = useRef(null);
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

  
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://34.118.240.12:8075/api/v1/admin/allUsers", {
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


  fetch("http://34.118.240.12:8075/api/v1/admin/delete/" + deletingUser, {
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
    
<div className='unselectable'>
      <div className="text-center" >

        
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
      </div>
    </>
  )
}
