import Filters from "@/components/modules/category-products/filter";
import { ProductCard } from "@/components/modules/layout/ProductCard";
import { categoryServices } from "@/services/categories/categories.services";
import { manufacturerServices } from "@/services/manufacturer/manufacturer.services";
import { productServices } from "@/services/products/products.services";
import { Product } from "@/types";

const AllCategoriesProducts = async ({searchParams} : {searchParams : Promise<{ [key: string]: string | undefined}>}) => {

  const {maxPrice,manufacturer} = await searchParams;  

  const categoriesData = categoryServices.getCategories();
  const manufacturerData = manufacturerServices.getManufacturer();
  const productsData = productServices.getProducts({
    manufacturer,
    maxPrice
  });

  const [categories, manufacturers, products] = await Promise.all([
    categoriesData,
    manufacturerData,
    productsData,
  ]);

  return (
    <div className="flex p-8 bg-gray-50">
      <Filters
        categories={categories.data}
        manufacturers={manufacturers.data}
        maxPrice={products.data.max_price}
      />
      <div className="grid grid-cols-3 gap-5">
        {products?.data?.data?.length > 0 &&
          products?.data?.data.map((item: Product) => (
            <ProductCard key={item.id} product={item} />
          ))}
      </div>
    </div>
  );
};

export default AllCategoriesProducts;
