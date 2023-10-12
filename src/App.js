import { useState, useEffect } from 'react';

// Firebase imports
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from './firebase';

// Router imports
import { Outlet } from 'react-router-dom';

// Styles
import { setupIonicReact } from '@ionic/react';
import '@ionic/react/css/core.css';
import './App.css';
import NavBar from './components/elements/Navbar';

setupIonicReact();

function App() {
  const [authUser, setAuthUser] = useState('initializing')
  const [userData, setUserData] = useState({})

  // Check if firebase is initialized
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

  // Return loading if firebase is uninitialized
  if(authUser === 'initializing') return <div>Loading...</div>

  // Get user data from firestore
  const getUserData = async() => {
    if(Object.keys(userData).length != 0) return;
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', '==', auth.currentUser.uid))
    let results = await getDocs(q)
    results.forEach((doc) => {
      results = doc.data()
    })
    setUserData(results);
  }
  getUserData()

  // Main app component wrapper
  console.log(userData);
  return (
    <div className="App" style={{ paddingTop: "env(safe-area-inset-top)"}}>
      <NavBar/>
      <Outlet context={[userData, setUserData]} />
    </div>
  );
}

export default App;
