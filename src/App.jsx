import { useEffect, useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { initFontSize } from '@/hooks/use-font-size';

// Apply saved font size before first render
initFontSize();
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { useToday } from '@/hooks/use-today';
import { LanguageProvider } from '@/lib/LanguageContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import OfflineBanner from './components/OfflineBanner';
import Home from './pages/Home';

const Login         = lazy(() => import('./pages/Login'));
const Register      = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const AuthenticatedApp = () => {
  const navigate = useNavigate();
  const { isLoadingAuth, authError } = useAuth();
  // Remount the shell when the calendar day changes so every date-derived
  // value (Today tab, readings banner, feast countdowns) recomputes.
  const today = useToday();

  useEffect(() => {
    if (!isLoadingAuth && authError?.type === 'auth_required') {
      navigate('/login', { replace: true });
    }
  }, [isLoadingAuth, authError, navigate]);

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError?.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  if (authError) return null;

  return (
    <Routes>
      <Route path="/" element={<Home key={today} />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem('fiat_lux_onboarded')
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingDone = () => {
    localStorage.setItem('fiat_lux_onboarded', 'true');
    setShowOnboarding(false);
  };

  return (
    <ErrorBoundary>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <LanguageProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <AnimatePresence mode="wait">
          {showSplash
            ? <SplashScreen key="splash" />
            : showOnboarding
            ? <Onboarding key="onboarding" onDone={handleOnboardingDone} />
            : null
          }
        </AnimatePresence>
        <Router>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/*" element={<AuthenticatedApp />} />
            </Routes>
          </Suspense>
        </Router>
        <OfflineBanner />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
    </LanguageProvider>
    </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
