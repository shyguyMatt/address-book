import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const AuthContext = createContext();
const UserContext = createContext();

// get current user and provide it to user Provider
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState('initializing');

  onAuthStateChanged(auth, (user) => {
    if(user) {
      setAuthUser(user)
    } else {
      setAuthUser(null)
    }
  })

  // Rendering  
  if(authUser === 'initializing') return <div>Loading...</div>

  return (
    <AuthContext.Provider value={{ authUser }}>
      <UserProvider>
        {children} 
      </UserProvider>
    </AuthContext.Provider>
  )
}

// Fetch userData from database and make it available
function UserProvider({ children }) {
  const { authUser } = useContext(AuthContext);
  const [userData, setUserData] = useState('loading');

  useEffect(() => {
    getUserData()
  }, [authUser])

  const getUserData = async() => {
    if(authUser === null) {
      setUserData(null)
    }
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('uid', '==', authUser.uid));
      let results = await getDocs(q);
      results.forEach((doc) => {
        setUserData(doc.data())
      })

    } catch (err) {
      console.error(err);
    }
  }

  // Rendering
  if(userData === 'loading') return <div>Loading Data</div>

  return (
    <UserContext.Provider value={{ userData, authUser, getUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;
