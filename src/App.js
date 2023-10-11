import './App.css';

import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';

import Home from './components/pages/Home';
import Addresses from './components/pages/Address List';
import { useState } from 'react';
import NavBar from './components/elements/Navbar';
import { Outlet } from 'react-router-dom';
import AuthDetails from './components/pages/AuthDetails';

setupIonicReact();

function App() {

  return (
    // <AuthProvider>
      <div className="App" style={{ paddingTop: "env(safe-area-inset-top)"}}>
        <Outlet></Outlet>
      </div>
    // </AuthProvider>
  );
}

export default App;
