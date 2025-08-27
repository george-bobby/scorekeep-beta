import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const { user, profile, userRole, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {userRole && (
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium capitalize">
                {userRole.replace('_', ' ')}
              </span>
            )}
            <nav className="flex items-center space-x-4">
              <Link to="/" className="text-sm hover:underline text-foreground">Home</Link>
              <Link to="/user" className="text-sm hover:underline text-foreground">User</Link>
              {(userRole === 'admin' || userRole === 'store_owner') && (
                <Link to="/store-owner" className="text-sm hover:underline text-foreground">Store Owner</Link>
              )}
              {userRole === 'admin' && (
                <Link to="/admin" className="text-sm hover:underline text-foreground">Admin</Link>
              )}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {profile && (
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{profile.name}</span>
              </div>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;