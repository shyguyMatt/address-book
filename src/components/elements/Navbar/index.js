import React, { useState } from 'react';

import {
  IonNav,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList
} from '@ionic/react';
import { add, map, home } from 'ionicons/icons';
import { Navigate } from 'react-router-dom';

export default function NavBar({ setLocation }) {
  const [navigate, setNavigate] = useState('')

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
          
        </IonFabList>
      </IonFab>
    </div>
  )
};