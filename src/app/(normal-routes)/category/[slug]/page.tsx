import Filters from "@/components/modules/category-products/filter";
import { ProductCard } from "@/components/modules/layout/ProductCard";
import { categoryServices } from "@/services/categories/categories.services";
import { manufacturerServices } from "@/services/manufacturer/manufacturer.services";
import { productServices } from "@/services/products/products.services";
import { Product } from "@/types";

const CategoryProductPage = async ({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams : Promise<{ [key: string]: string | undefined}>
}) => {
  const { slug } = await params; 
  const {maxPrice,manufacturer} = await searchParams;

  const categoryData = categoryServices.getCategories();
  const categoryProductsData = productServices.getProducts({
    category : slug,
    maxPrice,
    // manufacturer
  });

  


  const manufacturerData = manufacturerServices.getManufacturer();

  const [categories, categoryProducts,manufacturers] = await Promise.all([
    categoryData,
    categoryProductsData,
    manufacturerData
  ]);


  return (
    <div className="p-8 bg-gray-50 flex">
      <Filters categories={categories.data} manufacturers={manufacturers.data} products={categoryProducts.data.data} maxPrice={categoryProducts.data.max_price}/>
      <div className="grid grid-cols-3 gap-5">
        {
          categoryProducts?.data?.data?.length > 0 &&
          categoryProducts?.data?.data.map((item : Product) => (
            <ProductCard key={item.id} product={item}/>
          ))
        }
      </div>
    </div>
  );
};

export default CategoryProductPage;
