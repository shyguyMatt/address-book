import React, { useState, useRef, useEffect} from 'react';

// Import Styles
import './styles.scss'

import { GoogleMap } from '@capacitor/google-maps';
import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react';

export default function GoogleMaps() {
  let newMap;
  const mapRef = useRef(null);

  const [mapConfig, setMapConfig] = useState({
    zoom: 12,
    center: {
      lat: 33.6,
      lng: -117.9
    }
  });

  useEffect(() => {
    createMap()
  }, [ mapConfig ])

  const createMap = async() => {

    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'google-map',
      element: mapRef.current,
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
      config: mapConfig
    });
  }

  return(
    <IonPage>
      <IonContent>
        <capacitor-google-map id="map" ref={mapRef} />        
      </IonContent>
    </IonPage>
  )
}