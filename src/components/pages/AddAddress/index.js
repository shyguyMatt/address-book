import React, { useRef, useContext } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/react'
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import UserContext from '../../../contexts/AuthContext';

export default function AddAddress() {
  const { userData } = useContext(UserContext)

  const address1Ref = useRef();
  const address2Ref = useRef();
  const address3Ref = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const postalCodeRef = useRef();
  const stateRef = useRef();

  const addAddress = async(e) => {
    e.preventDefault();

    const newAddressRef = doc(collection(db, 'addresses'));
    const newAddressData = {
      address1: address1Ref.current.value,
      address2: address2Ref.current.value,
      address3: address3Ref.current.value,
      city: cityRef.current.value,
      country: countryRef.current.value,
      id: newAddressRef.id,
      postalcode: postalCodeRef.current.value,
      state: stateRef.current.value
    }

    try{ 
      await setDoc(newAddressRef, {...newAddressData})
    } catch (err) {
      console.error(err)
    }

    try {
      await updateDoc(doc(db, 'users', userData.uid), {
        addresses: arrayUnion(newAddressData.id)
      })
    } catch (err) {
      console.error(err)
    }

  }

  return(
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <IonTitle>Add a new Address</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <form onSubmit={addAddress}>
        <IonList>

          <IonItem>
            <IonLabel>Line 1</IonLabel>
            <IonInput ref={address1Ref}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Line 2</IonLabel>
            <IonInput ref={address2Ref}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Line 3</IonLabel>
            <IonInput ref={address3Ref}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>City</IonLabel>
            <IonInput ref={cityRef}></IonInput>
          </IonItem>
          
          <IonItem>
            <IonLabel>Country</IonLabel>
            <IonInput ref={countryRef}></IonInput>
          </IonItem>
          
          <IonItem>
            <IonLabel>Zip Code</IonLabel>
            <IonInput ref={postalCodeRef}></IonInput>
          </IonItem>
          
          <IonItem>
            <IonLabel>State</IonLabel>
            <IonInput ref={stateRef}></IonInput>
          </IonItem>

        </IonList>
        <IonButton expand='block' type='submit'>Add Address</IonButton>
      </form>
    </IonContent>
  </IonPage>
  )
}