import { createContext, useContext, useState } from "react"

// context
const AuthContext = createContext({})

// hook pro používání kontextu
export const useAuth = () => useContext(AuthContext)

// provider komponenta
export const AuthProvider = ({ children }) => {

  // stav, který bude uchovávat informaci o uživateli
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}
