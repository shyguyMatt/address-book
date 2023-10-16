import React, { useState, useEffect } from 'react';

import {
  IonNav,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList
} from '@ionic/react';
import { add, map, home, list } from 'ionicons/icons';
import { Navigate } from 'react-router-dom';

export default function NavBar({ setLocation }) {
  const [navigate, setNavigate] = useState(null)

  useEffect(() => {
    setNavigate(null)
  })

  const changeNavigation = (e) => {
    setNavigate(e.target.value)
  }

  return(
    <div>
      <Navigate to={navigate}/>
      <IonFab slot='fixed' vertical='bottom' horizontal='end'>
        <IonFabButton>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
        <IonFabList side='start'>

          <IonFabButton>
            <IonIcon icon={map} onClick={changeNavigation} value='/map'></IonIcon>
          </IonFabButton>

          <IonFabButton>
            <IonIcon icon={home} onClick={changeNavigation} value='/'></IonIcon>
          </IonFabButton>

          <IonFabButton>
            <IonIcon icon={list} onClick={changeNavigation} value='/addresses'></IonIcon>
          </IonFabButton>

        </IonFabList>
      </IonFab>
    </div>
  )
};