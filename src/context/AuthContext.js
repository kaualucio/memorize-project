import { createContext, useState, useEffect } from 'react'
import {
  signInWithPopup,
  provider,
  auth,
  onAuthStateChanged
} from '../firebase'

export const AuthContext = createContext({})

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { displayName, uid, photoURL } = user
        if (!displayName) {
          throw new Error('Missing information from Google Acount')
        }

        setUser({
          id: uid,
          name: displayName,
          photoURL
        })
      }
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)

    if (result.user) {
      const { displayName, uid, photoUrl } = result.user

      if (!displayName) {
        throw new Error('Missing information from Google Acount')
      }

      setUser({
        id: uid,
        name: displayName,
        photoUrl
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
