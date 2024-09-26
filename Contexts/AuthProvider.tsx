"use client";

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface UserCredentials {
  id: number;
  username: string;
  email: string;
  status: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userCredentials: UserCredentials | null;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userCredentials: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCredentials, setUserCredentials] =
    useState<UserCredentials | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken: { sub: UserCredentials } = jwtDecode(token); // Decode the token and extract the user credentials
        setUserCredentials(decodedToken.sub);
        setIsAuthenticated(true);
        router.replace("/app");
      } catch (error) {
        console.error("Invalid token", error);
        setIsAuthenticated(false);
        setUserCredentials(null);
        router.replace("/login");
      }
    } else {
      setIsAuthenticated(false);
      setUserCredentials(null);
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
