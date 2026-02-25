import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  
  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
