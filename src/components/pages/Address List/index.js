import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { db } from '../../../firebase';
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonButton,
  IonModal,
  IonLabel,
  IonInput
} from '@ionic/react';
import UserContext from '../../../contexts/AuthContext';

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    getAddresses()
  }, [userData])

  const getAddresses = async() => {
    try {
      const addressesRef = collection(db, 'addresses');
      const q =  query(addressesRef, where('id', 'in', userData.addresses));
      let results = await getDocs(q);
      let temp = [];
      results.forEach((doc) => {
        temp.push(doc.data())
      })
      setAddresses(temp);
    } catch (err) {
      console.error(err);
    }
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>This is the Address List page!</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      {addresses.map((address) => {
        return(
          <IonCard key={address.uid}>
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
      </IonContent>
    </IonPage>
  )
}