
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductManager from '@/components/admin/ProductManager';
import CategoryManager from '@/components/admin/CategoryManager';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Klassico Admin Panel</h1>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center gap-2">
              <HomeIcon size={16} />
              <span>View Website</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <Tabs defaultValue="products">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Products Management</h2>
              <p className="text-muted-foreground">
                Add, edit or delete products from your catalog. To add a new product, click the "Add New Product" button.
              </p>
            </div>
            <ProductManager />
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Categories Management</h2>
              <p className="text-muted-foreground">
                Manage your product categories. Categories help organize your products and make them easier to find.
              </p>
            </div>
            <CategoryManager />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          To add products to your website, navigate to the Products tab and click "Add New Product". 
          Fill in the product details and upload an image to display it on your store.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
