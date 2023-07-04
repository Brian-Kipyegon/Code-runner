import React from 'react';
import '../App.css';

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <h5 id='typing' className='logo'>Code<span className='highlight'>RUNNER</span></h5>
    </div>
  )
}
