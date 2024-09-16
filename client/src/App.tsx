import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth/page';
import VerifyLayout from './pages/auth/verify/layout';
import { useEffect } from 'react';
import { useAuthStore } from './hooks/useAuthStore';
import { Loader2 } from 'lucide-react';
import Rootlayout from './pages/layout';
import UserLayout from './pages/users/layout';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div className='text-white'>Checking Auth...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to='/auth' replace />;
  }

  if (!user.isVerify) {
    return <Navigate to='/verify-email' replace />;
  }

  return <>{children}</>;
};

const VerifyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  if (!user?.isVerify) {
    return <>{children}</>;
  }
  return <Navigate to='/' replace />;

};




const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  return !isAuthenticated ? <>{children}</> : <Navigate to="/conversations" />;
}

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div className='w-full h-screen flex items-center justify-center'>
      <Loader2 size={40} className='animate-spin text-white'/>
    </div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <VerifyRoute>
              <VerifyLayout />
            </VerifyRoute>
          }
        />
        <Route
          path="/conversations"
          element={
            <ProtectedRoute>
              <Rootlayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
