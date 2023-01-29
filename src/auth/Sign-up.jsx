import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { auth, db } from '../firebase-config';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                addDoc(collection(db, 'user_data'), {
                    user_id: user.uid,
                    name: name,
                    created: Timestamp.now() 
                })

                navigate('/home', { replace: true })
            })
    }

    return (
        <div>
            <div className="form">
                <form className="auth-form">
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
