
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string;
  image_url: string | null;
  in_stock: boolean;
  featured: boolean;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  // For UI display only, not in the database
  categoryName?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories: ' + error.message);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories:category_id (name)
      `)
      .order('name');
    
    if (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products: ' + error.message);
      return [];
    }
    
    return data.map(product => ({
      ...product,
      categoryName: product.categories?.name,
    })) || [];
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
};

export const getProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (!categoryData) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryData.id)
    .order('name');
  
  if (error) {
    console.error('Error fetching products by category:', error);
    toast.error('Failed to load products');
    return [];
  }
  
  return data || [];
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories:category_id (name)
    `)
    .eq('featured', true)
    .order('name');
  
  if (error) {
    console.error('Error fetching featured products:', error);
    toast.error('Failed to load featured products');
    return [];
  }
  
  return data.map(product => ({
    ...product,
    categoryName: product.categories?.name,
  })) || [];
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories:category_id (name)
    `)
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  
  return data ? {
    ...data,
    categoryName: data.categories?.name,
  } : null;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> => {
  try {
    // Log the product data for debugging
    console.log('Creating product with data:', product);
    
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product: ' + error.message);
      return null;
    }
    
    toast.success('Product created successfully');
    console.log('Product created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in createProduct:', error);
    if (error instanceof Error) {
      toast.error('Failed to create product: ' + error.message);
    } else {
      toast.error('Failed to create product');
    }
    return null;
  }
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>): Promise<Product | null> => {
  try {
    console.log('Updating product with ID:', id, 'and data:', product);
    
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product: ' + error.message);
      return null;
    }
    
    toast.success('Product updated successfully');
    console.log('Product updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in updateProduct:', error);
    if (error instanceof Error) {
      toast.error('Failed to update product: ' + error.message);
    } else {
      toast.error('Failed to update product');
    }
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    console.log('Deleting product with ID:', id);
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product: ' + error.message);
      return false;
    }
    
    toast.success('Product deleted successfully');
    console.log('Product deleted successfully');
    return true;
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    if (error instanceof Error) {
      toast.error('Failed to delete product: ' + error.message);
    } else {
      toast.error('Failed to delete product');
    }
    return false;
  }
};

export const uploadProductImage = async (file: File, productId: string): Promise<string | null> => {
  try {
    console.log('Uploading image for product ID:', productId, 'File:', file.name, 'Size:', file.size);
    
    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const timestamp = new Date().getTime();
    const filePath = `${productId}-${timestamp}.${fileExt}`;
    
    // Upload the file
    const { data, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        upsert: true,
        cacheControl: '3600',
      });
    
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      toast.error('Failed to upload image: ' + uploadError.message);
      return null;
    }
    
    console.log('File uploaded successfully:', data?.path);
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);
    
    console.log('Image public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadProductImage:', error);
    if (error instanceof Error) {
      toast.error('Failed to upload image: ' + error.message);
    } else {
      toast.error('Failed to upload image');
    }
    return null;
  }
};
