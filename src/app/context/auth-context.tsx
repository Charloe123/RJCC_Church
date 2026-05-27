import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'user' | 'member' | 'usher';
  branch: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const ADMIN_EMAILS = ['nkosi@uncommon.org'];

  const isAuthorizedEmail = (email: string | null | undefined) => {
    // In demo mode (no auth), allow all users
    if (!auth) return true;
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.toLowerCase());
  };

  useEffect(() => {
    // Check localStorage for existing auth first
    const authStatus = localStorage.getItem('rjcc_auth');
    const storedUser = localStorage.getItem('rjcc_user');

    if (authStatus === 'true' && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }

    // If Firebase is configured, set up the listener
    let unsubscribe: () => void = () => {};
    if (auth) {
      unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          if (isAuthorizedEmail(firebaseUser.email)) {
            const userData: User = {
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Admin',
              role: 'admin',
              branch: 'Main Branch',
            };
            setUser(userData);
            localStorage.setItem('rjcc_auth', 'true');
            localStorage.setItem('rjcc_user', JSON.stringify(userData));
          } else {
            // User is not authorized
            signOut(auth);
            localStorage.removeItem('rjcc_auth');
            localStorage.removeItem('rjcc_user');
            setUser(null);
          }
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('rjcc_auth', 'true');
    localStorage.setItem('rjcc_user', JSON.stringify(userData));
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
    localStorage.removeItem('rjcc_auth');
    localStorage.removeItem('rjcc_user');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
