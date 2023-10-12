import React, { useState, useRef} from 'react';

// Import Styles
import './styles.scss'

import { GoogleMap } from '@capacitor/google-maps';

export default function GoogleMaps() {

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
    <div>
      <capacitor-google-map id="map" />
    </div>
  )
}