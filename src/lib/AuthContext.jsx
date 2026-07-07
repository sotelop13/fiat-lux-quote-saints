import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SESSION_KEY = 'fiat_lux_session';
const USERS_KEY = 'fiat_lux_users';

async function hashPassword(password) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// SHA-256 hex string is exactly 64 lowercase hex chars
const isHashed = (s) => /^[0-9a-f]{64}$/.test(s);

const localAuth = {
  me() {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (!session) throw { code: 'auth_required' };
    return session.user;
  },
  async login({ email, password }) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const idx = users.findIndex(u => u.email === email);
    if (idx === -1) throw new Error('Invalid email or password.');
    const user = users[idx];
    const hash = await hashPassword(password);
    if (user.password === hash) {
      // Correct hashed password — proceed
    } else if (!isHashed(user.password) && user.password === password) {
      // Legacy plaintext match — migrate to hash on the fly
      users[idx] = { ...user, password: hash };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } else {
      throw new Error('Invalid email or password.');
    }
    const safe = { id: user.id, email: user.email, full_name: user.full_name };
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user: safe }));
    return safe;
  },
  loginAsGuest() {
    const guest = { id: 'guest', email: '', full_name: 'Guest', isGuest: true };
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user: guest }));
    return guest;
  },
  async register({ email, password, full_name }) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find(u => u.email === email)) throw new Error('Email already registered.');
    const hash = await hashPassword(password);
    const user = { id: `user-${Date.now()}`, email, password: hash, full_name };
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const safe = { id: user.id, email: user.email, full_name: user.full_name };
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user: safe }));
    return safe;
  },
  logout() {
    localStorage.removeItem(SESSION_KEY);
  },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);
  const navigateRef = useRef(null);

  const checkUserAuth = useCallback(() => {
    setIsLoadingAuth(true);
    try {
      const currentUser = localAuth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      setAuthError(null);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setAuthError({ type: err?.code === 'user_not_registered' ? 'user_not_registered' : 'auth_required' });
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  const navigateToLogin = useCallback(() => {
    navigateRef.current?.('/login');
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const loggedIn = localAuth.login({ email, password });
    setUser(loggedIn);
    setIsAuthenticated(true);
    setAuthError(null);
    return loggedIn;
  }, []);

  const loginAsGuest = useCallback(() => {
    const guest = localAuth.loginAsGuest();
    setUser(guest);
    setIsAuthenticated(true);
    setAuthError(null);
    return guest;
  }, []);

  const register = useCallback(async ({ email, password, full_name }) => {
    const newUser = await localAuth.register({ email, password, full_name });
    setUser(newUser);
    setIsAuthenticated(true);
    setAuthError(null);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    localAuth.logout();
    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(true);
    setAuthError({ type: 'auth_required' });
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authChecked,
      authError,
      checkUserAuth,
      navigateToLogin,
      login,
      loginAsGuest,
      register,
      logout,
      _setNavigate: (fn) => { navigateRef.current = fn; },
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function NavigateRegistrar() {
  const navigate = useNavigate();
  const { _setNavigate } = useAuth();
  useEffect(() => { _setNavigate(navigate); }, [navigate, _setNavigate]);
  return null;
}
