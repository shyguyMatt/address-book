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
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem
} from "@ionic/react";

import { add } from 'ionicons/icons';
import { GoogleMap } from '@capacitor/google-maps';
import { auth, db } from '../../../firebase';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { collection, query, where } from "firebase/firestore";
import { setDoc, doc, getDocs } from "firebase/firestore";

import AuthDetails from '../AuthDetails';

import './styles.scss';

export default function Home() {
  // const apiKey = 'AIzaSyDPkGr00qqmgiTFNjAUj7iwCKxshazgKNI';
  // let newMap;
  // const mapRef = useRef(null)

  // const [mapConfig, setMapConfig] = useState({
  //   zoom: 12,
  //   center: {
  //     lat: 33.6,
  //     lng: -117.9
  //   }
  // })

  // const createMap = async () => {
  //   if(!mapRef.current) return;

  //   newMap = await GoogleMap.create({
  //     id: 'google-map',
  //     element: document.getElementById('map'),
  //     apiKey: apiKey,
  //     config: mapConfig,
  //     forceCreate: true
  //   })
  // }
  const [addresses, setAddresses] = useState([])

  const addressesRef = collection(db, 'addresses')
  const q = query(addressesRef)

  const getAddresses = async() => {
    let tempArray = [];
    const results = await getDocs(q)
    results.forEach((doc) => {
      tempArray.push(doc.data())
    })
    setAddresses(tempArray);
  }

  console.log(addresses)


  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>This is the Homepage! Welcome!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <AuthDetails />
      <button onClick={getAddresses}>Get Addresses</button>
      {addresses.map((address) => {
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
      })}
        <IonFab slot='fixed' vertical='bottom' horizontal='end'>
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}