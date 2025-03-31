
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { getCategories, Category } from '@/services/ProductService';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
}

const CategoryManager: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const form = useForm<CategoryFormData>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    }
  });

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    form.reset({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!user) {
      toast.error('You must be logged in to perform this action');
      return;
    }

    if (window.confirm('Are you sure you want to delete this category? All associated products will be affected.')) {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting category:', error);
        toast.error('Failed to delete category: ' + error.message);
        return;
      }
      
      toast.success('Category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue('name', name);
    
    // Only auto-generate slug if it's a new category or slug hasn't been manually edited
    if (!selectedCategory || form.getValues('slug') === '' || form.getValues('slug') === generateSlug(selectedCategory.name)) {
      const slug = generateSlug(name);
      form.setValue('slug', slug);
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (!user) {
        toast.error('You must be logged in to perform this action');
        return;
      }

      setIsSubmitting(true);
      console.log('Form data submitted:', data);

      if (selectedCategory) {
        console.log('Updating existing category:', selectedCategory.id);
        // Update existing category
        const { data: updatedData, error } = await supabase
          .from('categories')
          .update({
            name: data.name,
            slug: data.slug,
            description: data.description,
          })
          .eq('id', selectedCategory.id)
          .select();

        if (error) {
          console.error('Error updating category:', error);
          toast.error('Failed to update category: ' + error.message);
          setIsSubmitting(false);
          return;
        }
        
        console.log('Category updated successfully:', updatedData);
        toast.success('Category updated successfully');
      } else {
        console.log('Creating new category');
        // Create new category
        const { data: createdData, error } = await supabase
          .from('categories')
          .insert([{
            name: data.name,
            slug: data.slug,
            description: data.description,
          }])
          .select();

        if (error) {
          console.error('Error creating category:', error);
          toast.error('Failed to create category: ' + error.message);
          setIsSubmitting(false);
          return;
        }
        
        console.log('Category created successfully:', createdData);
        toast.success('Category created successfully');
      }

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsFormOpen(false);
      form.reset();
      
    } catch (error) {
      console.error('Error saving category:', error);
      if (error instanceof Error) {
        toast.error('Failed to save category: ' + error.message);
      } else {
        toast.error('Failed to save category');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormClose = () => {
    setSelectedCategory(null);
    setIsFormOpen(false);
    form.reset();
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setSelectedCategory(null);
              form.reset();
            }}>
              <Plus className="mr-2" size={16} /> Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details to {selectedCategory ? 'edit an existing' : 'create a new'} category.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          onChange={handleNameChange}
                          placeholder="Jeans"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="jeans"
                        />
                      </FormControl>
                      <FormDescription>
                        Used in the URL, auto-generated from name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Premium denim jeans collection" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={handleFormClose} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (selectedCategory ? 'Update Category' : 'Create Category')}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10">
                No categories found. Add your first category to get started.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.description || '-'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                    <Pencil size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryManager;
