import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'

const AuthContext = createContext(null)

const ALLOWED_DOMAIN = 'spurs-inc.com'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email || ''
        if (email.endsWith(`@${ALLOWED_DOMAIN}`)) {
          setUser(firebaseUser)
          setError(null)
        } else {
          // ドメインが違う場合は強制ログアウト
          await signOut(auth)
          setUser(null)
          setError(`アクセスは @${ALLOWED_DOMAIN} のアカウントのみ許可されています。`)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
