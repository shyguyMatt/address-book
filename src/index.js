import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Addresses from './components/pages/Address List';
import LoginSignup from './components/pages/LoginSignup';
import GoogleMaps from './components/pages/GoogleMaps';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route path='' element={<Home/>}/>
            <Route path='/addresses' element={<Addresses/>}/>
            <Route path='/login' element={<LoginSignup/>}/>
            <Route path='/map' element={<GoogleMaps/>}/>
            <Route 
              path="*"
              element={
                <main>
                  <p>There's nothing here!</p>
                  <Link to='/'>Back Home!</Link>
                </main>
            }/>
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
