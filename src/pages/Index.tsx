import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  Star,
  Store,
  Users,
  Shield,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Lock,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';

const Index = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      // Redirect based on user role
      switch (userRole) {
        case 'admin':
          navigate('/admin');
          break;
        case 'store_owner':
          navigate('/store-owner');
          break;
        case 'user':
          navigate('/user');
          break;
        default:
          navigate('/user');
      }
    } else {
      navigate('/auth');
    }
  };

  const features = [
    {
      icon: Store,
      title: "Store Management",
      description: "Complete store profile management with analytics, customer feedback, and performance insights",
      badge: "Store Owner",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: Star,
      title: "Smart Rating System",
      description: "Advanced rating and review system with verified reviews and detailed feedback analytics",
      badge: "User",
      color: "bg-yellow-500/10 text-yellow-600"
    },
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive user administration with role management and platform oversight tools",
      badge: "Admin",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with role-based access control and data encryption",
      badge: "Security",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Real-time insights and performance metrics for data-driven decisions",
      badge: "Analytics",
      color: "bg-orange-500/10 text-orange-600"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Multi-language support and global store discovery capabilities",
      badge: "Global",
      color: "bg-indigo-500/10 text-indigo-600"
    }
  ];

  const benefits = [
    "🚀 Easy store discovery and advanced search",
    "🔒 Enterprise-grade security and authentication",
    "⚡ Real-time data synchronization",
    "📱 Fully responsive mobile-first design",
    "📊 Comprehensive analytics and reporting",
    "🎯 AI-powered recommendations",
    "🌍 Multi-language and currency support",
    "🔧 Advanced admin and moderation tools"
  ];

  const stats = [
    { label: "Active Stores", value: "10,000+", icon: Store },
    { label: "User Reviews", value: "50,000+", icon: Star },
    { label: "Platform Users", value: "25,000+", icon: Users },
    { label: "Uptime", value: "99.9%", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">Trusted by 25,000+ users worldwide</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            The Ultimate Store Rating Platform
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover exceptional stores, share authentic reviews, and build trust in your local business community.
            Join the revolution in store discovery and rating.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {user ? 'Go to Dashboard' : 'Get Started Free'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {!user && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/auth')}
                className="px-8 py-3 text-lg font-semibold border-2"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-2 p-3 rounded-full bg-primary/10 w-fit">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-card/30">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools you need for effective store management and discovery
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto mb-4 p-4 rounded-2xl w-fit ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <div className="flex justify-center mb-3">
                  <Badge variant="secondary" className="font-medium">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Built for Modern Businesses
            </h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-lg text-foreground leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 p-4 rounded-2xl bg-primary/10 w-fit">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg mt-4">
                Join thousands of businesses and users who trust our platform for authentic store ratings and reviews.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                className="w-full py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
                onClick={handleGetStarted}
              >
                {user ? 'Go to Dashboard' : 'Create Your Account'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {user
                    ? `Welcome back! Continue to your ${userRole?.replace('_', ' ')} dashboard.`
                    : "Choose your role during signup: User, Store Owner, or Admin"
                  }
                </p>
                {!user && (
                  <div className="flex items-center justify-center mt-4 space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Lock className="h-3 w-3" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>2 min setup</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Free forever</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-primary-foreground rounded-lg p-2">
                  <Star className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-foreground">ScoreKeep</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The ultimate platform for store ratings, reviews, and business discovery.
                Building trust in local communities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => navigate('/auth')} className="hover:text-foreground transition-colors">Sign Up</button></li>
                <li><button onClick={() => navigate('/auth')} className="hover:text-foreground transition-colors">Sign In</button></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Features</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Pricing</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Help Center</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Contact Us</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Documentation</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Community</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Cookie Policy</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">GDPR</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              &copy; 2025 ScoreKeep. Built with ❤️ for better store discovery and authentic reviews.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
