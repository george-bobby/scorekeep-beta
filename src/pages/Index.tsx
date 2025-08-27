import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Star, Store, Users, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

  // Homepage is now public - no auto redirect

  const features = [
    {
      icon: Store,
      title: "Store Management",
      description: "Store owners can manage their store information and view customer ratings",
      badge: "Store Owner"
    },
    {
      icon: Star,
      title: "Rating System",
      description: "Users can rate and review stores to help others make informed decisions",
      badge: "User"
    },
    {
      icon: Users,
      title: "User Management",
      description: "Admins can manage users, stores, and oversee platform operations",
      badge: "Admin"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure role-based system with different access levels for each user type",
      badge: "Security"
    }
  ];

  const benefits = [
    "Easy store discovery and rating",
    "Secure user authentication",
    "Real-time data updates",
    "Mobile-responsive design",
    "Comprehensive admin controls",
    "Store owner analytics"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Store Rating Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover, rate, and manage stores with our comprehensive platform. 
            Built for users, store owners, and administrators.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="px-8"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/auth')}
              className="px-8"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Platform Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform provides comprehensive tools for all user types
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex justify-center mb-2">
                  <Badge variant="outline">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Why Choose Our Platform?
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-8">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription>
                Join thousands of users already using our platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => navigate('/auth')}
              >
                Create Account
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Choose your role during signup: User, Store Owner, or Admin
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Store Rating Platform. Built with ❤️ for better store discovery.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
