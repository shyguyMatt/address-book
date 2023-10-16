import { useState, useEffect, useRef } from 'react';

// Firebase imports
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from './firebase';

// Router imports
import { Outlet } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext'

// Styles
import { setupIonicReact } from '@ionic/react';
import '@ionic/react/css/core.css';
import './App.css';
import NavBar from './components/elements/Navbar';

setupIonicReact();

function App() {

  // Main app component wrapper
  return (
    <div className="App" style={{ paddingTop: "env(safe-area-inset-top)"}}>
      <AuthProvider>
        <NavBar/>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
