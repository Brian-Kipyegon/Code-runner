import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate("/")
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
