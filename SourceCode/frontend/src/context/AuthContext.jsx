import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"

export const AuthContext = createContext()

const ADMIN_EMAIL = "sabina@test.com"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        try {
          // force refresh so newly granted admin claims are picked up
          const tokenResult = await currentUser.getIdTokenResult(true)
          const claimAdmin = tokenResult.claims?.admin === true
          setIsAdmin(claimAdmin || currentUser.email === ADMIN_EMAIL)
        } catch (error) {
          console.error(error)
          setIsAdmin(currentUser.email === ADMIN_EMAIL)
        }
      } else {
        setIsAdmin(false)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
