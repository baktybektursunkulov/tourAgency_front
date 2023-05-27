import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'
import Literature from './components/pages/Literature'
import ComputerScience from './components/pages/ComputerScience'
import Geology from './components/pages/Geology'
import Chemistry from './components/pages/Chemistry'
import Biology from './components/pages/Biology'
import Construction from './components/pages/Construction'
import AdminPage from './components/pages/AdminPage'
import UsersPage from './components/pages/UsersPage'
import ResetPasswordPage from './components/pages/ResetPasswordPage'

import './App.css'

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ LandingPage } />
                    <Route path="/login" component={ LoginPage } />
                    <Route path="/register" component={ RegisterPage } />
                    <Route path="/forget-password" component={ ForgetPasswordPage } />
                    <Route path="/home" component={ HomePage } />
                    <Route path="/admin" component={ AdminPage } />
                    <Route path="/users" component={ UsersPage } />
                    <Route path="/reset-password" component={ ResetPasswordPage } />
                    <Route path="/1" component={ Literature } />
                    <Route path="/2" component={ ComputerScience } />
                    <Route path="/3" component={ Geology } />
                    <Route path="/4" component={ Chemistry } />
                    <Route path="/5" component={ Biology } />
                    <Route path="/6" component={ Construction } />
                </Switch>
                {/* <Footer /> */}
            </div>
        </Router>
    )
}

// const Footer = () => {
//     return (
//         <p className="text-center" style={ FooterStyle }>Про нас <a href="https://satbayev.university" target="_blank" rel="noopener noreferrer">SATBAYEV UNIVERSITY</a></p>
//     )
// }

// const FooterStyle = {
//     background: "#222",
//     fontSize: ".8rem",
//     color: "#fff",
//     position: "absolute",
//     bottom: 0,
//     padding: "1rem",
//     margin: 0,
//     width: "100%",
//     opacity: "2.5"
// }