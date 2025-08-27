import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from './Layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'store_owner';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <Layout title="Access Denied">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-destructive mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>
          <p className="text-sm text-muted-foreground">
            Your current role: <span className="font-medium capitalize">{userRole?.replace('_', ' ')}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Required role: <span className="font-medium capitalize">{requiredRole.replace('_', ' ')}</span>
          </p>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;