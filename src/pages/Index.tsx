import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Star, Store, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
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

  // Redirect authenticated users to their respective dashboards
  if (user && userRole) {
    switch (userRole) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'store_owner':
        return <Navigate to="/store-owner" replace />;
      case 'user':
        return <Navigate to="/user" replace />;
      default:
        break;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Store Rating Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover, rate, and review stores in your area. Join our community of reviewers 
            and help others make informed decisions.
          </p>
          
          {!user && (
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="px-8 py-3">
                  Get Started
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Rate Stores</CardTitle>
              <CardDescription>
                Share your experience by rating stores from 1 to 5 stars
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Discover Stores</CardTitle>
              <CardDescription>
                Find stores in your area and read reviews from other customers
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Join Community</CardTitle>
              <CardDescription>
                Connect with other reviewers and help build a trustworthy platform
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to start rating?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of users who are helping others make better shopping decisions.
          </p>
          
          {!user && (
            <Link to="/auth">
              <Button size="lg" className="px-8 py-3">
                <Award className="mr-2 h-5 w-5" />
                Join Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
