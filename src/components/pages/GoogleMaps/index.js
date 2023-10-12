import React, { useState, useRef} from 'react';

// Import Styles
import './styles.scss'

import { GoogleMap } from '@capacitor/google-maps';
import { IonContent, IonPage } from '@ionic/react';

export default function GoogleMaps() {
  const [mapConfig, setMapConfig] = useState({
    zoom: 12,
    center: {
      lat: 33.6,
      lng: -117.9
    }
  })

  const createMap = async () => {
    const newMap = await GoogleMap.create({
      id: 'google-map',
      element: document.getElementById('map'),
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
      config: mapConfig,
      forceCreate: false
    })
  }

  return(
    <IonPage>
      <IonContent>
        <button onClick={createMap}>create map</button>
        <capacitor-google-map id="map" />        
      </IonContent>
    </IonPage>
  )
}