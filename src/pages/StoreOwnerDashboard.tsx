import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Shield, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface StoreRating {
  id: string;
  rating: number;
  user_id: string;
  profiles: {
    name: string;
  };
  created_at: string;
}

interface StoreInfo {
  id: string;
  name: string;
  email: string;
  address: string;
  avg_rating: number;
  total_ratings: number;
}

const StoreOwnerDashboard = () => {
  const { user, updatePassword, userRole } = useAuth();
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [ratings, setRatings] = useState<StoreRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  // Determine if this is admin access
  const isAdminAccess = userRole === 'admin';
  const isNativeStoreOwnerAccess = userRole === 'store_owner';

  const getPageTitle = () => {
    if (isAdminAccess) return 'Store Owner Profile Management';
    return 'Store Owner Dashboard';
  };

  const getAccessBadge = () => {
    if (isAdminAccess) return { label: 'Admin Access', variant: 'destructive' as const, icon: Shield };
    return null;
  };

  useEffect(() => {
    fetchStoreData();
  }, [user]);

  const fetchStoreData = async () => {
    if (!user) return;

    try {
      // Fetch store owned by current user
      const { data: storeData } = await supabase
        .from('stores')
        .select('*')
        .eq('owner_id', user.id)
        .maybeSingle();

      if (!storeData) {
        setLoading(false);
        return;
      }

      // Fetch ratings for this store
      const { data: ratingsData } = await supabase
        .from('ratings')
        .select('*')
        .eq('store_id', storeData.id)
        .order('created_at', { ascending: false });

      // Fetch profiles for the ratings
      const ratingsWithProfiles = await Promise.all((ratingsData || []).map(async (rating) => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name')
          .eq('user_id', rating.user_id)
          .maybeSingle();

        return {
          ...rating,
          profiles: profile || { name: 'Anonymous' }
        };
      }));

      const avgRating = ratingsWithProfiles && ratingsWithProfiles.length > 0
        ? ratingsWithProfiles.reduce((sum, r) => sum + r.rating, 0) / ratingsWithProfiles.length
        : 0;

      setStoreInfo({
        id: storeData.id,
        name: storeData.name,
        email: storeData.email,
        address: storeData.address,
        avg_rating: avgRating,
        total_ratings: ratingsWithProfiles?.length || 0
      });

      setRatings(ratingsWithProfiles || []);
    } catch (error) {
      console.error('Error fetching store data:', error);
      toast({
        title: "Error",
        description: "Failed to load store data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get('newPassword') as string;

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
      toast({
        title: "Error",
        description: "Password must be 8-16 characters with 1 uppercase and 1 special character",
        variant: "destructive"
      });
      return;
    }

    const { error } = await updatePassword(newPassword);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Password updated successfully"
      });
      setShowPasswordDialog(false);
    }
  };

  if (loading) {
    return (
      <Layout title={getPageTitle()}>
        <div className="text-center">Loading...</div>
      </Layout>
    );
  }

  if (!storeInfo) {
    return (
      <Layout title={getPageTitle()}>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-muted-foreground">No Store Found</h2>
          <p className="text-muted-foreground">
            {isAdminAccess
              ? "No stores are currently registered in the system."
              : "You don't have a store assigned to your account."
            }
          </p>
        </div>
      </Layout>
    );
  }

  const accessBadge = getAccessBadge();

  return (
    <Layout title={getPageTitle()}>
      <div className="space-y-8">
        {/* Access Notification */}
        {accessBadge && (
          <Alert className="border-l-4 border-l-primary">
            <accessBadge.icon className="h-4 w-4" />
            <AlertDescription className="flex items-center gap-2">
              <Badge variant={accessBadge.variant}>{accessBadge.label}</Badge>
              <span>
                You are viewing store owner profiles with administrative privileges. You can manage all store data and settings.
              </span>
            </AlertDescription>
          </Alert>
        )}

        {/* Store Info and Actions */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{storeInfo.name}</h2>
            <p className="text-muted-foreground">{storeInfo.address}</p>
            <p className="text-muted-foreground">{storeInfo.email}</p>
          </div>
          {isNativeStoreOwnerAccess && (
            <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">Update Password</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Password</DialogTitle>
                  <DialogDescription>Enter your new password</DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      placeholder="8-16 chars, 1 uppercase, 1 special"
                    />
                  </div>
                  <Button type="submit" className="w-full">Update Password</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Star className="h-6 w-6 text-yellow-400 mr-2" />
                {storeInfo.avg_rating.toFixed(1)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeInfo.total_ratings}</div>
            </CardContent>
          </Card>
        </div>

        {/* Ratings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Ratings</CardTitle>
            <CardDescription>Reviews from customers who rated your store</CardDescription>
          </CardHeader>
          <CardContent>
            {ratings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No ratings yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ratings.map((rating) => (
                    <TableRow key={rating.id}>
                      <TableCell>{rating.profiles?.name || 'Anonymous'}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {rating.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(rating.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StoreOwnerDashboard;