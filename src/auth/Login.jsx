import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import '../css/Login.css';
import { auth } from '../firebase-config';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Function to authenticate a user
    const login = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            console.log(response);
            navigate('/home', { replace: true })
        })
        .catch((error) => {
            toast.error("Error occured please try again");
        });
    }

    return (
        <div className="login-page">
            <ToastContainer />
            <div className="form">
                <form className="login-form">
                    <input type="text" placeholder="email" name="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
                    <input type="password" placeholder="password" name="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
                    <button onClick={login}>login</button>
                    <p className="message">Not registered? <Link to="/sign-up">Create an account</Link></p>
                </form>
            </div>
        </div>
    )
}
