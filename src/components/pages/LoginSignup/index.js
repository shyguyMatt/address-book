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
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import AuthDetails from "../AuthDetails";
import { Navigate } from "react-router-dom";

export default function LoginSignup () {
  const [loginState, setLoginState] = useState(true)
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  // const { signup } = useAuth()

  const handleLogin = (e) => {
    e.preventDefault()
    console.log({email: emailRef.current.value, password: passwordRef.current.value})
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        console.log(userCredential)
        window.location.assign('/')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    console.log({username: usernameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value})
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        console.log(userCredential)
        window.location.assign('/')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return(
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Login/SignUp</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <AuthDetails />
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