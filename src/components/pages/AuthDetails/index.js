import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null);
      }
    })
  }, [])

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log('logged out')
    }).catch(err => console.error(err))
  }

  return (
    <div>
      { authUser ? 
      <>
        <p>{`Signed In as ${authUser.email}`}</p>
        <button onClick={userSignOut}>Sign Out</button>
      </>
       : 
       <>
        <p>SignedOut</p>
        <Link to='/login'>Login</Link>
      </>}
      </div>
  )
}
