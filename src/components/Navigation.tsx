import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
    LogOut,
    User,
    Menu,
    X,
    Home,
    Store,
    Users,
    Shield,
    Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
    className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
    const { user, profile, userRole, signOut } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    const navigationLinks = [
        { href: '/', label: 'Home', icon: Home, public: true },
        ...(user ? [
            // User Dashboard - accessible by all authenticated users (admin can access user profiles)
            { href: '/user', label: 'User Dashboard', icon: Star, roles: ['user', 'admin', 'store_owner'] },
            // Store Owner Dashboard - accessible by store owners and admins (admin can access store owner profiles)
            ...(userRole === 'store_owner' || userRole === 'admin' ? [
                { href: '/store-owner', label: 'Store Owner Dashboard', icon: Store, roles: ['store_owner', 'admin'] }
            ] : []),
            // Admin Dashboard - only accessible by admins
            ...(userRole === 'admin' ? [
                { href: '/admin', label: 'Admin Dashboard', icon: Shield, roles: ['admin'] }
            ] : [])
        ] : [])
    ];

    return (
        <nav className={cn("bg-card border-b border-border", className)}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo/Brand */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-primary text-primary-foreground rounded-lg p-2">
                            <Star className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-foreground">ScoreKeep</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <link.icon className="h-4 w-4" />
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                {userRole && (
                                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium capitalize">
                                        {userRole.replace('_', ' ')}
                                    </span>
                                )}
                                {profile && (
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <User className="h-4 w-4" />
                                        <span>{profile.name}</span>
                                    </div>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSignOut}
                                    className="flex items-center space-x-1"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </Button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate('/auth')}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => navigate('/auth')}
                                >
                                    Get Started
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-border py-4">
                        <div className="space-y-3">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <link.icon className="h-4 w-4" />
                                    <span>{link.label}</span>
                                </Link>
                            ))}

                            <div className="border-t border-border pt-3 mt-3">
                                {user ? (
                                    <>
                                        {profile && (
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground px-2 py-1">
                                                <User className="h-4 w-4" />
                                                <span>{profile.name}</span>
                                                {userRole && (
                                                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium capitalize ml-auto">
                                                        {userRole.replace('_', ' ')}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                handleSignOut();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex items-center space-x-2 w-full mt-2"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Logout</span>
                                        </Button>
                                    </>
                                ) : (
                                    <div className="space-y-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                navigate('/auth');
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full"
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                navigate('/auth');
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full"
                                        >
                                            Get Started
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
