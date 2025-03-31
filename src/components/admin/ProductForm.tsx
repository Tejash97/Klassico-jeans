
import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
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
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Upload } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  getCategories, 
  createProduct, 
  updateProduct, 
  uploadProductImage,
  Product,
  Category 
} from '@/services/ProductService';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
}

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  category_id: string;
  in_stock: boolean;
  featured: boolean;
  tags: string[];
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: '',
      category_id: '',
      in_stock: true,
      featured: false,
      tags: [],
    }
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        slug: product.slug,
        description: product.description || '',
        price: product.price.toString(),
        category_id: product.category_id,
        in_stock: product.in_stock,
        featured: product.featured,
        tags: [],
      });
      setTags(product.tags || []);
      setImagePreview(product.image_url || null);
    } else {
      form.reset();
      setTags([]);
      setImagePreview(null);
    }
  }, [product, form]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue('name', name);
    
    // Only auto-generate slug if it's a new product or slug hasn't been manually edited
    if (!product || form.getValues('slug') === '' || form.getValues('slug') === generateSlug(product.name)) {
      const slug = generateSlug(name);
      form.setValue('slug', slug);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop functionality
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (!user) {
        toast.error('You must be logged in to perform this action');
        return;
      }
      
      // Validate required fields
      if (!data.name) {
        toast.error('Product name is required');
        return;
      }
      
      if (!data.category_id) {
        toast.error('Please select a category');
        return;
      }
      
      if (!data.price || isNaN(parseFloat(data.price))) {
        toast.error('Please enter a valid price');
        return;
      }
      
      setIsUploading(true);
      console.log('Form data submitted:', data);
      console.log('Tags:', tags);
      
      const productData = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: parseFloat(data.price),
        category_id: data.category_id,
        in_stock: data.in_stock,
        featured: data.featured,
        tags: tags,
        image_url: product?.image_url || null,
      };

      console.log('Preparing to save product with data:', productData);
      
      let savedProduct;
      
      if (product) {
        // Update existing product
        savedProduct = await updateProduct(product.id, productData);
        if (!savedProduct) {
          toast.error('Failed to update product');
          setIsUploading(false);
          return;
        }
      } else {
        // Create new product
        savedProduct = await createProduct(productData);
        if (!savedProduct) {
          toast.error('Failed to create product');
          setIsUploading(false);
          return;
        }
      }

      console.log('Product saved successfully:', savedProduct);

      // If we have a new image, upload it
      if (savedProduct && imageFile) {
        console.log('Uploading image for product:', savedProduct.id);
        try {
          const imageUrl = await uploadProductImage(imageFile, savedProduct.id);
          console.log('Image uploaded, URL:', imageUrl);
          
          if (imageUrl) {
            await updateProduct(savedProduct.id, { image_url: imageUrl });
            console.log('Product updated with image URL');
          } else {
            toast.error('Image upload failed');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error('Image upload failed');
        }
      }

      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(product ? 'Product updated successfully' : 'Product created successfully');
      onClose();
      
    } catch (error) {
      console.error('Error saving product:', error);
      if (error instanceof Error) {
        toast.error(`Error saving product: ${error.message}`);
      } else {
        toast.error('Error saving product');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      onChange={handleNameChange}
                      placeholder="Milano Slim Fit Jeans" 
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
                      placeholder="milano-slim-fit-jeans"
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
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (₹)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number" 
                      min="0" 
                      step="1"
                      placeholder="2999" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => removeTag(tag)} 
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" size="sm" onClick={addTag}>
                  <Plus size={16} />
                </Button>
              </div>
              <FormDescription>
                E.g., "Limited Edition", "Handcrafted", "Sustainable"
              </FormDescription>
            </div>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Premium handcrafted jeans made with the finest Italian denim..." 
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Product Image</FormLabel>
              {imagePreview ? (
                <div className="w-full">
                  <AspectRatio ratio={4/3} className="bg-muted overflow-hidden rounded-md">
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div 
                  className={`border-2 border-dashed ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'} rounded-md p-6 text-center relative h-[200px] cursor-pointer transition-colors duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => {
                    const input = document.getElementById('product-image-input');
                    if (input) {
                      input.click();
                    }
                  }}
                >
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    JPG, PNG or GIF (Max 5MB)
                  </p>
                  <Input
                    id="product-image-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <FormField
                control={form.control}
                name="in_stock"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">In Stock</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">Featured Product</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
