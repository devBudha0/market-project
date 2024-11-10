import { createContext, useContext, useState } from "react"

// Context
const AuthContext = createContext({})

// Custom hook for using the context
export const useAuth = () => useContext(AuthContext)

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
