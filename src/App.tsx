import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import AuthLayout from './components/layouts/AuthLayout';
import LoadingScreen from './components/ui/LoadingScreen';

const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const EmailConfirmation = lazy(() => import('./pages/EmailConfirmation'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Setup auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={session ? <Dashboard /> : <Navigate to="/signin" replace />} 
        />
        
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route 
            path="/signup" 
            element={!session ? <SignUp /> : <Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/signin" 
            element={!session ? <SignIn /> : <Navigate to="/dashboard" replace />} 
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-confirmation" element={<EmailConfirmation />} />
        </Route>
        
        {/* Default redirect */}
        <Route 
          path="*" 
          element={<Navigate to={session ? "/dashboard" : "/signin"} replace />} 
        />
      </Routes>
    </Suspense>
  );
}

export default App;