import { useAuthStore } from "@/hooks/useAuthStore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
        return <div className='text-white'>Checking Auth...</div>;
    }

    if (!isAuthenticated || !user || !user.isVerify || !user.isSetupProfile) {
        return <Navigate to='/auth' replace />;
    }

    return <>{children}</>;
};



export const VerifyRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthStore();
    if (!user?.isVerify) {
        return <>{children}</>;
    }

    return <Navigate to='/conversations' replace />;
};

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuthStore();
    return !isAuthenticated ? <>{children}</> : <Navigate to="/conversations" />;
};

export const SetUpProfileRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthStore();
    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    if (!user.isSetupProfile) {
        return <>{children}</>;
    }

    return <Navigate to="/conversations" replace />;
};