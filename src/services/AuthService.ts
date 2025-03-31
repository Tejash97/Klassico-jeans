
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AuthUser = {
  id: string;
  email: string;
  isAdmin: boolean;
};

// Check if the user is an admin based on email
export const isAdmin = (email: string | undefined): boolean => {
  if (!email) return false;
  
  // This is the configured admin email
  return email === 'try.tejash@gmail.com';
};

export const signIn = async (email: string, password: string): Promise<AuthUser | null> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      toast.error(error.message);
      return null;
    }

    if (!data.user) {
      toast.error('No user data found');
      return null;
    }

    const userEmail = data.user.email;
    
    return {
      id: data.user.id,
      email: userEmail || '',
      isAdmin: isAdmin(userEmail),
    };
  } catch (error) {
    console.error('Sign in error:', error);
    toast.error('Failed to sign in');
    return null;
  }
};

export const signUp = async (email: string, password: string): Promise<AuthUser | null> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Sign up error:', error);
      toast.error(error.message);
      return null;
    }

    if (!data.user) {
      toast.error('No user data returned on signup');
      return null;
    }

    const userEmail = data.user.email;
    
    toast.success('Account created! Please check your email for verification.');
    
    return {
      id: data.user.id,
      email: userEmail || '',
      isAdmin: isAdmin(userEmail),
    };
  } catch (error) {
    console.error('Sign up error:', error);
    toast.error('Failed to sign up');
    return null;
  }
};

export const signOut = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
      toast.error(error.message);
      return false;
    }
    
    toast.success('Signed out successfully');
    return true;
  } catch (error) {
    console.error('Sign out error:', error);
    toast.error('Failed to sign out');
    return false;
  }
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const { data } = await supabase.auth.getSession();
    
    if (!data.session || !data.session.user) {
      return null;
    }
    
    const userEmail = data.session.user.email;
    
    return {
      id: data.session.user.id,
      email: userEmail || '',
      isAdmin: isAdmin(userEmail),
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};
