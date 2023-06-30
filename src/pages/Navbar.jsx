import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase-config';

import '../css/Navbar.css';

export default function Navbar() {

    const logout = () => {
        signOut(auth);
    }

    return (
        <div className='navbar'>
            <p>Code Runner</p>
            <button className='btn-7' onClick={logout}><span>Logout</span></button>
        </div>
    )
}
