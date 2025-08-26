import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, Search, Edit, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Store {
  id: string;
  name: string;
  address: string;
  avg_rating: number;
  user_rating?: number;
}

const UserDashboard = () => {
  const { user, updatePassword } = useAuth();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeFilter, setStoreFilter] = useState('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [editingRating, setEditingRating] = useState<string | null>(null);
  const [newRating, setNewRating] = useState<number>(1);

  useEffect(() => {
    fetchStores();
  }, [user]);

  const fetchStores = async () => {
    if (!user) return;

    try {
      // Fetch all stores with their ratings
      const { data: storesData } = await supabase
        .from('stores')
        .select(`
          *,
          ratings(rating, user_id)
        `);

      const storesWithRatings = (storesData || []).map(store => {
        const allRatings = store.ratings;
        const userRating = allRatings.find((r: any) => r.user_id === user.id);
        const avgRating = allRatings.length > 0 
          ? allRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / allRatings.length 
          : 0;

        return {
          id: store.id,
          name: store.name,
          address: store.address,
          avg_rating: avgRating,
          user_rating: userRating?.rating || undefined
        };
      });

      setStores(storesWithRatings);
    } catch (error) {
      console.error('Error fetching stores:', error);
      toast({
        title: "Error",
        description: "Failed to load stores",
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

  const handleRatingSubmit = async (storeId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('ratings')
        .upsert({
          user_id: user.id,
          store_id: storeId,
          rating: newRating
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Rating submitted successfully"
      });
      
      setEditingRating(null);
      fetchStores();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(storeFilter.toLowerCase()) ||
    store.address.toLowerCase().includes(storeFilter.toLowerCase())
  );

  if (loading) {
    return (
      <Layout title="User Dashboard">
        <div className="text-center">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout title="User Dashboard">
      <div className="space-y-8">
        {/* Actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Welcome to Store Ratings</h2>
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
        </div>

        {/* Stores List */}
        <Card>
          <CardHeader>
            <CardTitle>Store Ratings</CardTitle>
            <CardDescription>View and rate stores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search stores by name or address..."
                    value={storeFilter}
                    onChange={(e) => setStoreFilter(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Overall Rating</TableHead>
                  <TableHead>Your Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell>{store.address}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {store.avg_rating.toFixed(1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {editingRating === store.id ? (
                        <div className="flex items-center space-x-2">
                          <select 
                            value={newRating} 
                            onChange={(e) => setNewRating(Number(e.target.value))}
                            className="border rounded px-2 py-1"
                          >
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                          <Button 
                            size="sm" 
                            onClick={() => handleRatingSubmit(store.id)}
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditingRating(null)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {store.user_rating ? (
                            <>
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              {store.user_rating}
                            </>
                          ) : (
                            <span className="text-muted-foreground">Not rated</span>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRating !== store.id && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setEditingRating(store.id);
                            setNewRating(store.user_rating || 1);
                          }}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          {store.user_rating ? 'Edit' : 'Rate'}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserDashboard;