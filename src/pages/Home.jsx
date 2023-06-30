import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
    </div>
  )
}
