-- Seed data for testing all functionalities
-- This script can be run in Supabase SQL editor

-- Note: Replace the UUID values with actual user IDs from your auth.users table
-- You can get these by signing up users through the frontend first

-- Sample user profiles (these will be created automatically when users sign up)
-- Just provided here as reference

-- Sample stores data
INSERT INTO public.stores (name, email, address, owner_id) VALUES 
('Tech Haven Electronics', 'contact@techhaven.com', '123 Main Street, Downtown Tech District, New York, NY 10001', 'user-id-for-store-owner-1'),
('Green Garden Market', 'info@greengardenmarket.com', '456 Oak Avenue, Organic Valley Shopping Center, San Francisco, CA 94102', 'user-id-for-store-owner-2'),
('Fashion Forward Boutique', 'hello@fashionforward.com', '789 Style Boulevard, Fashion District, Los Angeles, CA 90028', 'user-id-for-store-owner-3'),
('BookWorm Paradise', 'books@bookwormparadise.com', '321 Literary Lane, Arts Quarter, Seattle, WA 98101', 'user-id-for-store-owner-4'),
('Coffee Roasters Corner', 'brew@coffeeroasters.com', '654 Bean Street, Coffee District, Portland, OR 97201', 'user-id-for-store-owner-5')
ON CONFLICT (id) DO NOTHING;

-- Sample ratings (replace user_id and store_id with actual IDs)
-- These would normally be created through the user interface
-- INSERT INTO public.ratings (user_id, store_id, rating) VALUES 
-- ('user-id-1', 'store-id-1', 5),
-- ('user-id-2', 'store-id-1', 4),
-- ('user-id-3', 'store-id-2', 5),
-- ('user-id-1', 'store-id-3', 3),
-- ('user-id-2', 'store-id-4', 4);

-- Note: To properly seed this data:
-- 1. First create user accounts through the frontend signup
-- 2. Assign appropriate roles (admin, user, store_owner) during signup
-- 3. Then run the stores insert with actual user IDs as owner_id
-- 4. Finally, submit ratings through the user interface

-- Query to check current data:
-- SELECT 'profiles' as table_name, count(*) as count FROM public.profiles
-- UNION ALL
-- SELECT 'user_roles', count(*) FROM public.user_roles
-- UNION ALL
-- SELECT 'stores', count(*) FROM public.stores
-- UNION ALL
-- SELECT 'ratings', count(*) FROM public.ratings;
