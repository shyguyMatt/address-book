import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './styles.scss'


export default function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
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
    <div id='status'>
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
