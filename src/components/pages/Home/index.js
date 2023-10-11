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
  IonCol
} from "@ionic/react";

import { GoogleMap } from '@capacitor/google-maps';

import './styles.scss';

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

  // useIonViewWillEnter(() => {
  //   console.log("test");
  //   createMap();
  // });

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>This is the Homepage! Welcome!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonDatetime/>
        <IonRow>
          <IonCol size='12'>
            <capacitor-google-map ref={mapRef} id='map'></capacitor-google-map>
          </IonCol>
        </IonRow>
        <button onClick={createMap}>createMap</button>
      </IonContent>
    </IonPage>
  )
}