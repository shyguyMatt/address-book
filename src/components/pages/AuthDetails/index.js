import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../../firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useOutletContext } from 'react-router-dom';
import UserContext from '../../../contexts/AuthContext';
import './styles.scss'

// Temporary Document for authentication details
export default function AuthDetails() {
  const { userData, authUser } = useContext(UserContext)

  const userSignOut = () => {
    signOut(auth).then(() => {

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
