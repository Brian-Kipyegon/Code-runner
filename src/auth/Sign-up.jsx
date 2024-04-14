import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

import '../css/Login.css';
import { auth, db } from '../firebase-config';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    // Saves a registered user to firebase
    const register = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                addDoc(collection(db, 'user_data'), {
                    user_id: user.uid,
                    name: name,
                    created: Timestamp.now() 
                }).then(() => {
                    console.log('User added');
                }).catch((error) => {
                    console.log("Firebase error" + error);
                });

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
                    <input type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="email address" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button onClick={register}>create</button>
                    <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}
