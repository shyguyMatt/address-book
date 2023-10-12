import React, { useRef, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

// Import Styles
import {
  IonContent,
  IonDatetime,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonViewWillEnter,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem
} from "@ionic/react";
import { add } from 'ionicons/icons';
import './styles.scss';

import { GoogleMap } from '@capacitor/google-maps';

import AuthDetails from '../AuthDetails';



export default function Home() {
  const apiKey = 'AIzaSyDPkGr00qqmgiTFNjAUj7iwCKxshazgKNI';
  let newMap;
  const mapRef = useRef(null)

  const [mapConfig, setMapConfig] = useState({
    zoom: 12,
    center: {
      lat: 33.6,
      lng: -117.9
    }
  })

  const createMap = async () => {
    if(!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'google-map',
      element: document.getElementById('map'),
      apiKey: apiKey,
      config: mapConfig,
      forceCreate: true
    })
  }
  const [userData, setUserData] = useOutletContext();

  const logUserData = () => {
    console.log(userData);
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
      {/* {addresses.map((address) => {
        return(
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>address</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>{address.address1}</IonItem>
                {address.address2?<IonItem>{address.address2}</IonItem>:null}
                {address.address3?<IonItem>{address.address3}</IonItem>:null}
                <IonItem>{address.city}</IonItem>
                <IonItem>{address.state}</IonItem>
                <IonItem>{address.country}</IonItem>
                <IonItem>{address.postalcode}</IonItem>             
              </IonList>

            </IonCardContent>
          </IonCard>
        )
      })} */}
      </IonContent>
    </IonPage>
  )
}