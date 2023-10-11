import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from "@ionic/react";
import React, { useState, useRef } from "react";
import { auth, db } from "../../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDocs } from "firebase/firestore";
import AuthDetails from "../AuthDetails";
import { Link, Navigate } from "react-router-dom";
import { collection, query, where } from "firebase/firestore";

export default function LoginSignup () {
  const [loginState, setLoginState] = useState(true)
  const [navigateBool, setNavigateBool] = useState(false)
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const addressesRef = collection(db, 'addresses')
  const q = query(addressesRef)

  const getAddresses = async() => {
    const results = await getDocs(q)
    console.log(results)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const credentials = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)

      setNavigateBool(true)
    } catch(err) {
        console.error(err)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      const credentials = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)

      const newUser = {
        username: usernameRef.current.value,
        email: emailRef.current.value
      }
      await setDoc(doc(db, 'users', credentials.user.uid), {...newUser})

      setNavigateBool(true)
    } catch(err) {
        console.error(err)
    }
  }

  return(
    <IonPage>
      {navigateBool ? 
        <Navigate to='/'/> : null}
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Login/SignUp</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <AuthDetails />
            <Link to='/'>Home</Link>
            {loginState ?
            <form onSubmit={handleLogin}>
              {/* Login Form */}
              <IonList>
                <IonItem>
                  <IonLabel>Email</IonLabel>
                  <IonInput ref={emailRef}></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Password</IonLabel>
                  <IonInput ref={passwordRef} type='password'></IonInput>
                </IonItem>
              </IonList>
              <IonButton type='submit' expand='block'>Login</IonButton>
            </form>
            :
            <form onSubmit={handleSignUp}>
              {/* SignUp Form */}
              <IonList>
                <IonItem>
                  <IonLabel>Username</IonLabel>
                  <IonInput ref={usernameRef}></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Email</IonLabel>
                  <IonInput ref={emailRef} type='email'></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Password</IonLabel>
                  <IonInput ref={passwordRef} type='password'></IonInput>
                </IonItem>
              </IonList>
              <IonButton type='submit' expand='block'>SignUp</IonButton>
            </form>
            }
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}