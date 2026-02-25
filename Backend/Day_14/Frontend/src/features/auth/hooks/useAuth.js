import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register } from "../services/auth.api.js";

export function useAuth() {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);

    try {
      const response = await login(username, password);
      console.log(response.user);

      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);

    try {
      const response = await register(username, email, password);
      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
  };
}
