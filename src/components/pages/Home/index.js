import React, { useRef, useState, useEffect, useContext } from 'react';

// Import Styles
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import './styles.scss';

import AuthDetails from '../AuthDetails';
import UserContext from '../../../contexts/AuthContext';

// Home page
export default function Home() {
  const { userData, authUser } = useContext(UserContext)

  const logUserData = async() => {
    console.log({auth: authUser, data: userData})
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>This is the Homepage! Welcome!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <AuthDetails />
      <button onClick={logUserData}>Log</button>
      </IonContent>
    </IonPage>
  )
}