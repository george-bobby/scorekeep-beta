-- Update the handle_new_user function to properly handle role assignment
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, address)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', 'User Name'),
    COALESCE(NEW.raw_user_meta_data ->> 'address', 'User Address')
  );
  
  -- Assign role based on user metadata, default to 'user'
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id, 
    COALESCE(
      (NEW.raw_user_meta_data ->> 'role')::app_role,
      'user'::app_role
    )
  );
  
  RETURN NEW;
END;
$$;
