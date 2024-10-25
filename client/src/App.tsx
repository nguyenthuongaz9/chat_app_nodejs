import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth/page';
import VerifyLayout from './pages/auth/verify/layout';
import { useMemo } from 'react';
import { useAuthStore } from './hooks/useAuthStore';
import { Loader2 } from 'lucide-react';
import RootLayout from './pages/layout';
import UserLayout from './pages/users/layout';
import SetupPage from './pages/setup/page';
import ConversationIdLayout from './pages/conversationId/layout';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div className='text-white'>Checking Auth...</div>;
  }

  if (!isAuthenticated || !user || !user.isVerify || !user.isSetupProfile) {
    return <Navigate to='/auth' replace />;
  }
  if (!user.isVerify) {
    return <Navigate to='/verify-email' replace />;
  }
  if (!user.isSetupProfile) {
    return <Navigate to='/setup-profile' replace />;
  }

  return <>{children}</>;
};



const VerifyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  if (!user?.isVerify) {
    return <>{children}</>;
  }

  return <Navigate to='/conversations' replace />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <>{children}</>;
  }
  if (!user.isVerify) {
    return <Navigate to='/verify-email' replace />;
  }
  if (!user.isSetupProfile) {
    return <Navigate to='/setup-profile' replace />;
  }
  return <Navigate to='/conversations' replace />;
};

const SetUpProfileRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!user.isSetupProfile) {
    return <>{children}</>;
  }

  return <Navigate to="/conversations" replace />;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useMemo(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Loader2 size={40} className='animate-spin text-white' />
      </div>
    );
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
            <VerifyRoute>/
              <VerifyLayout />
            </VerifyRoute>
          }
        />
        <Route
          path="/conversations"
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/conversations/:id"
          element={
            <ProtectedRoute>
              <ConversationIdLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/setup-profile"
          element={
            <SetUpProfileRoute>
              <SetupPage />
            </SetUpProfileRoute>
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
