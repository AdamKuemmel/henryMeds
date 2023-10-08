import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export interface User {
  username: string;
  provider: boolean;
}

export interface AuthContextType {
  user?: User | null;
  signin: (newUser: User, callback: VoidFunction) => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Load user data from local storage on initial render
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  useEffect(() => {
    // Save user data to local storage whenever user changes
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const signin = (newUser: User, callback: VoidFunction) => {
    fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = () => {
    fakeAuthProvider.signout(() => {
      setUser(null);
    });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  return useContext(AuthContext)!;
}

const RequireAuth: FC<{}> = ({}) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { fakeAuthProvider, AuthProvider, useAuth, RequireAuth };
