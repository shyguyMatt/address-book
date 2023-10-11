import React, { useRef, useState } from 'react';
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
  IonIcon
} from "@ionic/react";

import { add } from 'ionicons/icons';

import { GoogleMap } from '@capacitor/google-maps';

import './styles.scss';
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

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>This is the Homepage! Welcome!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <AuthDetails />
        <IonFab slot='fixed' vertical='bottom' horizontal='end'>
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}